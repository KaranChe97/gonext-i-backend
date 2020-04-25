const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/profile");
const profile = {};

profile.getAll = async (req, res, next) => {
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

profile.getAllByBrainTrust = async (req, res, next) => {
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

profile.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.profileID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

profile.create = async (req, res, next) => {
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

profile.createMany = async (req, res, next) => {
    try{
        req.body.profile.map(data => data.brainTrust = req.params.brainTrust );
        const data = await createMany(req.body.profile);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

profile.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.profileID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

profile.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.profileID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = profile;