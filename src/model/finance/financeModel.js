const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
    entity : {
        type : String
    },
    MTDRev : {
        type : Number
    },
    MTDRevPlan : {
        type : Number
    },
    MTDProfit : {
        type : Number
    },
    MTDProfitPlan : {
        type : Number
    },
    YTDRev : {
        type : Number
    },
    YTDRevPlan : {
        type : Number
    },
    YTDProfit : {
        type : Number
    },
    YTDProfitPlan : {
        type : Number
    },
    CF : {
        type : Number
    },
    CFPlan : {
        type : Number
    }
},{
    timestamps : true
});

module.exports = mongoose.model("finance",financeSchema);