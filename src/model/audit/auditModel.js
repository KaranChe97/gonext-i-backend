const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    department : {
        type : String
    },
    complaint : {
        type : String
    },
    complaintStatus : {
        type : String,
        enum : ["Y","N","N/A"]
    },
    control : {
        type : String,
        enum : ["M","A","ITDM"]
    },
},{
    timestamps : true
});

module.exports = mongoose.model("audit",auditSchema);