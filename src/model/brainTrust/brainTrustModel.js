const mongoose = require("mongoose");

const brainTrustSchema = new mongoose.Schema({
    industry : {
        type : String
    },
    investmentPack : {
        type : String
    },
    expertInputs : {
        type : String,
    },
    internalInputs : {
        type : String,
    },
    feasibilityStudy : {
        type : String,
    }
},{
    timestamps : true
});

module.exports = mongoose.model("brainTrust",brainTrustSchema);