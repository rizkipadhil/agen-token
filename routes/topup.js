const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const dataController = require('../controller/toptup');
const modelData = require('../models').topup;
const authMiddleware = require('../middleware/auth');

var router = express.Router();

const createSchema = {
    userId: Joi.number().required(),
    nominal: Joi.number().required()
};

router.get('/', authMiddleware.verifyToken, dataController.allData);
router.get('/user/:id', authMiddleware.verifyToken, dataController.allUserOrderData);
router.get('/:id', authMiddleware.verifyToken, dataController.findData);
router.post('/', authMiddleware.verifyToken, validator.body(createSchema), dataController.createData);
router.put('/:id/update/:status', authMiddleware.verifyToken, dataController.updateData);
router.delete('/:id', authMiddleware.verifyToken, dataController.deleteData);
module.exports = router;