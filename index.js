const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const jwt = require('jsonwebtoken');

//router
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const voucherRouter = require('./routes/voucher');

const app = express();
app.use(cors());
app.use(bodyParser({}));

app.use(homeRouter);
app.use(authRouter);
app.use('/voucher',voucherRouter);

app.listen(config.port, () => {
    console.log('Server is running on port 3000...');
});