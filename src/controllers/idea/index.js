const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/idea");
const idea = {};

idea.getAll = async (req, res, next) => {
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

idea.getAllByBrainTrust = async (req, res, next) => {
    try{
        const data = await getAll({ brainTrust : req.params.brainTrust });
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

idea.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.ideaID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

idea.create = async (req, res, next) => {
    try{
        req.body.brainTrust = req.params.brainTrust;
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

idea.createMany = async (req, res, next) => {
    try{
        req.body.idea.map(data => data.brainTrust = req.params.brainTrust );
        const data = await createMany(req.body.idea);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

idea.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.ideaID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

idea.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.ideaID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = idea;