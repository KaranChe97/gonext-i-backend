const assert = require("assert");
const { getAll,  createOne } = require("../../model/boardMemberReview");
const boardMemberReviewMetric = {};

boardMemberReviewMetric.getAll = async (req, res, next) => {
    try{
        const data = await getAll({ name : req.params.name});
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

boardMemberReviewMetric.create = async (req, res, next) => {
    try{
        assert(req.body.review, "review is required");
        assert(req.body.name, "name is required");
        const data = await createOne(req.body.name, req.body.review);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = boardMemberReviewMetric;