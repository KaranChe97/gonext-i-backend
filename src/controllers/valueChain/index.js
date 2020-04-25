const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/valueChain");
const valueChain = {};

valueChain.getAll = async (req, res, next) => {
    try{
        const data = await getAll();
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

valueChain.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.valueChainID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

valueChain.create = async (req, res, next) => {
    try{
        assert(req.body.entity, "entity is required");
        const data = await createOne(req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

valueChain.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.valueChain);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

valueChain.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.valueChainID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

valueChain.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.valueChainID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = valueChain;