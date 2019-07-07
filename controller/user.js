const modelData = require('../models').User;
const relationData = require('../models').Order;
const relationDataTopup = require('../models').topup;
const relationDatakonfirmasi = require('../models').konfirmasi;
const bcrypt = require('bcrypt');

const allData = async (req, res) => {
    try {
        var data = await modelData.findAll({
            include: [{
                model: relationData
            }, {
                model: relationDataTopup
            }]
        });
        res.json({
            status: 200,
            message: 'Success',
            data: data
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
};


const updateData = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findData) res.json({
            status: 0,
            message: "User Not Found"
        });
        if(email !== findData.email) {
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
            }
        }
        const same = await bcrypt.compare(password, findData.password);
        if (!same) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            let encryptedPassword = hash;
        }else{
            let encryptedPassword = findData.password;
        }
        var data = await modelData.update({
            email: email,
            password: encryptedPassword,
            firstName: firstName,
            lastName: lastName
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: 200,
            message: 'Success',
            data: req.body
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

const deleteData = async (req, res) => {
    try {
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        const deleteDataRelation1 = await relationData.destroy({
            where: {
                userId: findData.id
            }
        })
        const deleteDataRelation2 = await relationDataTopup.destroy({
            where: {
                userId: findData.id
            }
        })
        const deleteDataRelation3 = await relationDatakonfirmasi.destroy({
            where: {
                userId: findData.id
            }
        })
        const deleteData = await modelData.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            status: 200,
            message: 'Success',
            data: findData
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

const findData = async (req, res) => {
    try {
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: 200,
            message: 'Success',
            data: findData
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

module.exports = {
    allData,
    updateData,
    deleteData,
    findData
};