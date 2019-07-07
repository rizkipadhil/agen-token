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

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(homeRouter);
app.use(authRouter);
app.use('/voucher',voucherRouter);
app.use('/user',voucherRouter);

app.use(passport.initialize());

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.json({
        status: err.code,
        message: err.message
    });
});



app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port + '...');
});