const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/pipeline");
const pipeline = {};

pipeline.getAll = async (req, res, next) => {
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

pipeline.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.pipelineID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

pipeline.create = async (req, res, next) => {
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

pipeline.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.pipeline);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

pipeline.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.pipelineID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

pipeline.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.pipelineID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = pipeline;