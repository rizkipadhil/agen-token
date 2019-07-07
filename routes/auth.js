const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const authController = require('../controller/auth');
const modelData = require('../models').User;
const authMiddleware = require('../middleware/auth');


var router = express.Router();

const loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required()
};
const registerSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string()
        .required()
        .min(8)
};

router.post('/login', validator.body(loginSchema), authController.login);

router.post('/register', validator.body(registerSchema), authController.register);

router.get('/profile', authMiddleware.verifyToken, async (req, res) => {
    const data = await modelData.findOne({
        where: {
            id: req.user_active.id
        }
    });
    res.json({
        status: 200,
        message: 'success',
        data: data
    });
});

module.exports = router;