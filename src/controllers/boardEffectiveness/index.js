const assert = require("assert");
const { getAll, getAllByAggregate, getByID, createOne,createMany, edit, deleteOne } = require("../../model/boardEffectiveness");
const boardEffectivenessMetric = {};

boardEffectivenessMetric.getAll = async (req, res, next) => {
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

boardEffectivenessMetric.getAllByAggregate = async (req, res, next) => {
    try{
        const data = await getAllByAggregate();
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

boardEffectivenessMetric.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.boardEffectivenessID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

boardEffectivenessMetric.create = async (req, res, next) => {
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

boardEffectivenessMetric.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.boardEffectiveness);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

boardEffectivenessMetric.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.boardEffectivenessID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

boardEffectivenessMetric.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.boardEffectivenessID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = boardEffectivenessMetric;