const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const dataController = require('../controller/user');
const modelData = require('../models').user;
const authMiddleware = require('../middleware/auth');

var router = express.Router();

const updateSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string()
        .required()
        .min(8)
};


router.get('/', dataController.allData);
router.get('/:id', authMiddleware.verifyToken, dataController.findData);
router.put('/:id', authMiddleware.verifyToken, validator.body(updateSchema), dataController.updateData);
router.delete('/:id', authMiddleware.verifyToken, dataController.deleteData);
module.exports = router;
