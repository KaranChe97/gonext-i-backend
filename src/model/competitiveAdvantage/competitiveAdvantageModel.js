const mongoose = require("mongoose");

const competitiveAdvantageSchema = new mongoose.Schema({
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
    advantage : {
        type : String
    },
    measure : {
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

module.exports = mongoose.model("competitiveAdvantage",competitiveAdvantageSchema);