const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/resourceAndExpense");
const resourceAndExpense = {};

resourceAndExpense.getAll = async (req, res, next) => {
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

resourceAndExpense.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.resourceAndExpenseID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

resourceAndExpense.create = async (req, res, next) => {
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

resourceAndExpense.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.resourceAndExpense);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

resourceAndExpense.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.resourceAndExpenseID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

resourceAndExpense.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.resourceAndExpenseID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = resourceAndExpense;