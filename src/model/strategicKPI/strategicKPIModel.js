const mongoose = require("mongoose");

const strategicKPISchema = new mongoose.Schema({
    entity : {
        type : String
    },
    goal : {
        type : String
    },
    kpiMetric : {
        type : String
    },
    kpiDefinition : {
        type : String
    },
    weighting : {
        type : Number
    },
    rating : {
        type : Number,
        enum : [1,2,3,4,5,6]
    }
},{
    timestamps : true
});

module.exports = mongoose.model("strategicKPI",strategicKPISchema);