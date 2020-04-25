const assert = require("assert");
const { getAll, getAllByAggregate, getByID, createOne,createMany, edit, deleteOne } = require("../../model/audit");
const audit = {};

audit.getAll = async (req, res, next) => {
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

audit.getAllByAggregate = async (req, res, next) => {
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

audit.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.auditID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

audit.create = async (req, res, next) => {
    try{
        assert(req.body.department, "department is required");
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

audit.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.audit);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

audit.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.auditID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

audit.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.auditID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = audit;