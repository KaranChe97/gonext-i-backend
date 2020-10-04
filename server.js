const mongoose = require('mongoose');
const app = require('./src/app');

const port = process.env.PORT || 4000;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('DB connection created successfully');
    } else {
        console.log('error in creating DB connection', err);
    }
});

const server = require('http').Server(app);

server.listen(port, (err) => {
    if (!err) {
        console.log(`server started at ${port}`);
    } else {
        console.log('error in starting server', err);
    }
});
 