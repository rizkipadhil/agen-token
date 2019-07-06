const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const authController = require('../controller/auth');
const modelData = require('../models').User;

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

module.exports = router;