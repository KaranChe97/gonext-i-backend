const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
    brainTrust : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "brainTrust",
    },
    stage : { 
        type : String
    },
    submittedBy : { 
        type : String
    },
    idea : { 
        type : String
    },
},{
    timestamps : true
});

module.exports = mongoose.model("idea",ideaSchema);