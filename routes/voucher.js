const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const dataController = require('../controller/voucher');
const modelData = require('../models').Voucher;
const authMiddleware = require('../middleware/auth');

var router = express.Router();

const createSchema = {
    harga: Joi.number().required(),
    nama: Joi.string().required(),
    stok: Joi.number().required()
};

const updateSchema = {
    harga: Joi.number().required(),
    nama: Joi.string().required(),
    stok: Joi.number().allow("")
};

const updateStockSchema = {
    stok: Joi.number().required()
}

router.get('/', dataController.allData);
router.get('/:id', dataController.findData);
router.post('/', authMiddleware.verifyToken, validator.body(createSchema), dataController.createData);
router.put('/:id', authMiddleware.verifyToken, validator.body(updateSchema), dataController.updateData);
router.put('/stock/:id', authMiddleware.verifyToken, validator.body(updateStockSchema), dataController.updateStockData);
router.delete('/:id', authMiddleware.verifyToken, dataController.deleteData);
module.exports = router;