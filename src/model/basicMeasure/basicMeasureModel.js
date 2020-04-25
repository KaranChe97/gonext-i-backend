const mongoose = require("mongoose");

const basicMeasureSchema = new mongoose.Schema({
    entity : {
        type : String,
        enum : ["LRED","CPL","LBS","TRI-C","LGC","SSLH"]
    },
    target : {
        type : String
    },
    targetDate : {
        type : Date
    },
    area : {
        type : String
    },
    requirement : {
        type : String
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

module.exports = mongoose.model("basicMeasure",basicMeasureSchema);