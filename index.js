const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');

//router
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const voucherRouter = require('./routes/voucher');
const userRouter = require('./routes/user');
const topupRouter = require('./routes/topup');
const orderRouter = require('./routes/order');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(homeRouter);
app.use(authRouter);
app.use('/voucher',voucherRouter);
app.use('/user',userRouter);
app.use('/topup',topupRouter);
app.use('/order',orderRouter);

app.use(passport.initialize());

// error handler
app.use(function (err, req, res, next) {
    var status = err.status || 500;
    res.status(statuus);
    res.json("error", {
        error: err,
        status: status,
        message: err.message
    });
});




app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port + '...');
});
