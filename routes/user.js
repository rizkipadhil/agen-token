const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const dataController = require('../controller/voucher');
const modelData = require('../models').Voucher;
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


router.get('/', authMiddleware.verifyToken, dataController.allData);
router.get('/:id', authMiddleware.verifyToken, dataController.findData);
router.put('/:id', authMiddleware.verifyToken, validator.body(updateSchema), dataController.updateData);
router.delete('/:id', authMiddleware.verifyToken, dataController.deleteData);
module.exports = router;