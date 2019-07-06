const express = require('express');
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    joi: Joi
});
const authController = require('../controller/auth');
const modelData = require('../models').Voucher;

var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Voucher List'
    })
});
router.get('/:id', (req, res) => {
    res.json({
        status: 200,
        message: 'Voucher Find ' + req.params.id
    })
});
router.post('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Voucher Create ' + JSON.stringify(req.body)
    })
});
router.put('/:id', (req, res) => {
    res.json({
        status: 200,
        message: 'Voucher Update ' + req.params.id + ' With ' + JSON.stringify(req.body)
    })
});
router.delete('/:id', (req, res) => {
    res.json({
        status: 200,
        message: 'Voucher Delete ' + req.params.id
    })
});
module.exports = router;