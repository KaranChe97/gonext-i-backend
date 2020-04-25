const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/strategicKPI");
const strategicKPI = {};

strategicKPI.getAll = async (req, res, next) => {
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

strategicKPI.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.strategicKPIID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

strategicKPI.create = async (req, res, next) => {
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

strategicKPI.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.strategicKPI);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

strategicKPI.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.strategicKPIID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

strategicKPI.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.strategicKPIID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = strategicKPI;