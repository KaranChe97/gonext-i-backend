const express = require('express');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routes');

app.use(cors());

app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    next();
});

app.use('/api', router);

app.use((req, res, next) => {
    const error = new Error('Route Not Found');
    error.status = 400;
    next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((e, req, res, next) => {
    e.status = e.status || 500;
    e.message = e.message || 'server error ';
    console.log(e);
    res.status(e.status).json({
        status: false,
        message: e.message,
        error: e,
    });
});

module.exports = app;
