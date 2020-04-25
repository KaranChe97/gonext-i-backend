const mongoose = require("mongoose");

const boardEffectivenessSchema = new mongoose.Schema({
    entity : {
        type : String,
        enum : ["LRED","CPL","LBS","TRI-C","LGC","SSLH"]
    },
    name : {
        type : String
    },
    annualCost : {
        type : Number
    },
    deliverable : {
        type : String
    },
    status : {
        type : String
    },
    totalPercentage : {
        type : Number
    }
},{
    timestamps : true
});

module.exports = mongoose.model("boardEffectiveness",boardEffectivenessSchema);