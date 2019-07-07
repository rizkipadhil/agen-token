const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const dataController = require('../controller/order');
const modelData = require('../models').Order;
const authMiddleware = require('../middleware/auth');

var router = express.Router();

const createSchema = {
    voucherId: Joi.number().required()
};

router.get('/', authMiddleware.verifyToken, dataController.allData);
router.get('/user', authMiddleware.verifyToken, dataController.allUserOrderData);
router.get('/:id', authMiddleware.verifyToken, dataController.findData);
router.post('/', authMiddleware.verifyToken, validator.body(createSchema), dataController.createData);
router.delete('/:id', authMiddleware.verifyToken, dataController.deleteData);
module.exports = router;