const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema({
    entity : {
        type : String,
        enum : ["LRED","CPL","LBS","TRI-C","LGC","SSLH"]
    },
    target : {
        type : String
    },
    detail : {
        type : String
    },
    closingDate : {
        type : Date
    },
    potentialValue : {
        type : Number
    },
    status : {
        type : String
    },
    totalPercentage : {
        type : Number
    },
    review : {
        type : String
    }
},{
    timestamps : true
});

module.exports = mongoose.model("pipeline",pipelineSchema);