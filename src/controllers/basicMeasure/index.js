const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/basicMeasure");
const basicMeasureMetric = {};

basicMeasureMetric.getAll = async (req, res, next) => {
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

basicMeasureMetric.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.basicMeasureID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

basicMeasureMetric.create = async (req, res, next) => {
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

basicMeasureMetric.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.basicMeasure);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

basicMeasureMetric.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.basicMeasureID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

basicMeasureMetric.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.basicMeasureID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = basicMeasureMetric;