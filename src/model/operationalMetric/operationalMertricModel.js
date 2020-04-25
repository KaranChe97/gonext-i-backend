const mongoose = require("mongoose");

const operationalMetricSchema = new mongoose.Schema({
    entity : {
        type : String,
        enum : ["LRED","CPL","LBS","TRI-C","LGC","SSLH"]
    },
    target : {
        type : String
    },
    metric : {
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

module.exports = mongoose.model("operationalMetric",operationalMetricSchema);