const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const modelData = require('../models').User;
const config = require('../config');

const generateToken = async (email, role) => {
    return jwt.sign({
        email,
        role
    }, config.secret);
};

const login = async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await modelData.findOne({
            where: {
                email
            }
        });
        if (!user) {
            res.json({
                status: 0,
                message: 'User not Found',
                data: req.body
            })
        }

        const same = await bcrypt.compare(password, user.password);
        if (!same) {
            res.json({
                status: 0,
                message: 'Invalid Password'
            })
        } else {
            let role = user.role;
            let token = await generateToken(email, role);
            res.json({
                status: 200,
                message: 'Success',
                data: user,
                token: token
            })
        }
    } catch (error) {
        console.log(error)
    }           
}
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const user = await modelData.findOne({
            where: {
                email
            }
        });
        if (user) {
            res.json({
                status: 0,
                message: 'Email has been registered'
            })
        }else{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let encryptedPassword = hash;
            const newUser = await modelData.create({
                email: email,
                password: encryptedPassword,
                firstName: firstName,
                lastName: lastName
            });
            res.json({
                status: 200,
                message: 'Success',
                data: user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    register
}