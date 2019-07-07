const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const dataController = require('../controller/topup');
const modelData = require('../models').topup;
const authMiddleware = require('../middleware/auth');

var router = express.Router();

const createSchema = {
    userId: Joi.number().required(),
    nominal: Joi.number().required()
};
const konfirmasiSchema = {
    banknumber: Joi.string().required(),
    nama: Joi.string().required()
};

router.get('/', authMiddleware.verifyToken, dataController.allData);
router.get('/user', authMiddleware.verifyToken, dataController.allUserOrderData);
router.get('/:id', authMiddleware.verifyToken, dataController.findData);
router.post('/', authMiddleware.verifyToken, validator.body(createSchema), dataController.createData);
router.post('/konfirmasi/:id', authMiddleware.verifyToken, validator.body(konfirmasiSchema), dataController.konfirmasiData);
router.put('/:id/update/:status', authMiddleware.verifyToken, dataController.updateStatusData);
router.put('/:id/konfirmasi/:status', authMiddleware.verifyToken, dataController.updateKonfirmasiData);
router.delete('/:id', authMiddleware.verifyToken, dataController.deleteData);
module.exports = router;