const mongoose = require('mongoose');
const app = require('./src/app');

const port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
// mongodb+srv://dcompany:dcompany123@cluster0-6ykz3.mongodb.net/lootah_holding?retryWrites=true&w=majority
// mongodb+srv://batman:bat123@water-drop-rbwca.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://batman:batman123@water-drop-rbwca.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
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
 