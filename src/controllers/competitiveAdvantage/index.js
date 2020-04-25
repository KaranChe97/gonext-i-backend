const assert = require("assert");
const { getAll, getByID, createOne,createMany, edit, deleteOne } = require("../../model/competitiveAdvantage");
const competitiveAdvantage = {};

competitiveAdvantage.getAll = async (req, res, next) => {
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

competitiveAdvantage.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.competitiveAdvantageID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

competitiveAdvantage.create = async (req, res, next) => {
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

competitiveAdvantage.createMany = async (req, res, next) => {
    try{
        const data = await createMany(req.body.competitiveAdvantage);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

competitiveAdvantage.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.competitiveAdvantageID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

competitiveAdvantage.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.competitiveAdvantageID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = competitiveAdvantage;