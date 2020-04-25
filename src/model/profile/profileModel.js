const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    brainTrust : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "brainTrust",
    },
    name : { 
        type : String 
    },
    profilePic : { 
        type : String 
    },
    currentCompany : { 
        type : String 
    },
    currentPosition : { 
        type : String 
    },
    appliedPosition : { 
        type : String 
    },
    resume : { 
        type : String 
    },
},{
    timestamps : true
});

module.exports = mongoose.model("profile",profileSchema);