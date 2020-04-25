const mongoose = require("mongoose");

const valueChainSchema = new mongoose.Schema({
    entity : {
        type : String,
        enum : ["LRED","CPL","LBS","TRI-C","LGC","SSLH"]
    },
    input : {
        type : String
    },
    solution : {
        type : String
    },
    output : {
        type : String
    }
},{
    timestamps : true
});

module.exports = mongoose.model("valueChain",valueChainSchema);