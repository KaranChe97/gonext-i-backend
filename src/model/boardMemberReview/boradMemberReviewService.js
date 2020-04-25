const boardMemberReview = require("./boardMemberReviewModel");

const boardMemberReviewService = {};

boardMemberReviewService.getAll = (data) => boardMemberReview.find(data);

boardMemberReviewService.createOne = (name , review) => boardMemberReview.findOneAndUpdate({ name },{ review }, { upsert : true});
 
module.exports = boardMemberReviewService;