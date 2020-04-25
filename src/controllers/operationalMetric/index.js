const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/operationalMetric");
const operationalMetric = {};

operationalMetric.getAll = async (req, res, next) => {
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

operationalMetric.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.operationalMetricID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

operationalMetric.create = async (req, res, next) => {
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

operationalMetric.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.operationalMetric);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

operationalMetric.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.operationalMetricID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

operationalMetric.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.operationalMetricID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = operationalMetric;