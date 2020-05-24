const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/inventory");
const inventory = {};

inventory.getAll = async (req, res, next) => { 
    try{
        const data = await getAll(req.body.gonextId);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.itemId);        
        res.status(200).json({  
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.create = async (req, res, next) => {
    try{
        req.body.organizationID = req.body.gonextId;
        const data = await createOne(req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){ 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};

inventory.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.inventory);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.itemId, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

inventory.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.itemId);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = inventory;