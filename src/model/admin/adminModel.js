const mongoose = require("mongoose");
const { generateHash } = require("../../common/hash");

const adminSchema = new mongoose.Schema({
    name : {
        type : String
    },
    phonenumber : {
        type : String
    },
    password : {
        type : String
    }, 
    company : {
        type : String
    },
    address : {
        type : String
    },
    role : {
        type : String,
        enum : ["superAdmin","admin","user"] 
    },
    verified : {
        type : Boolean
    } 
    },{        
        timestamps : true
});

adminSchema.pre("save" , async function(next){
    this.password = await generateHash(this.password);
    next();
});

module.exports = mongoose.model("admin",adminSchema);