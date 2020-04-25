const mongoose = require("mongoose");

const boardMemberReviewSchema = new mongoose.Schema({
    name : {
        type : String
    },
    review : {
        type : String
    }
},{
    timestamps : true
});

module.exports = mongoose.model("boardMemberReview",boardMemberReviewSchema);