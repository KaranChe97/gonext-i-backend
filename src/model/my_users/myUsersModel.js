const mongoose = require("mongoose");

const myUsersSchema = new mongoose.Schema({   
        name : {type:  String},
        phonenumber: {type:  Number},
        address: {type: String},
        paymentPending: {type: Number},
        type: {
            type:  String,
            enum: ['myUser']
        },     
        organizationID: {type: String}  
},{
    timestamps : true
});

module.exports = mongoose.model("myUsers",myUsersSchema); 