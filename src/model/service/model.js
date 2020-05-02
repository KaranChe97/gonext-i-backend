const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    phonenumber : {
        type : String
    },
    verificationCode : {
        type : String
    },
    verified : {
        type : Boolean,
    },
    
},{
    timestamps : true
});

module.exports = mongoose.model("service",serviceSchema);