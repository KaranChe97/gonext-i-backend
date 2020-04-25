const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/brainTrust");
const { deleteMany } = require("../../model/idea");
const profile = require("../../model/profile");
const brainTrust = {};

brainTrust.getAll = async (req, res, next) => {
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

brainTrust.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.brainTrustID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

brainTrust.create = async (req, res, next) => {
    try{
        assert(req.body.industry, "industry is required");
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

brainTrust.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.brainTrust);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

brainTrust.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.brainTrustID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

brainTrust.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.brainTrustID);
        const data1 = await deleteMany(req.params.brainTrustID);
        const data2 = await profile.deleteMany(req.params.brainTrustID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = brainTrust;