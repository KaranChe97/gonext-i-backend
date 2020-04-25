const assert = require("assert");
const { getAll, getOne, getByID, createOne, edit, deleteOne } = require("../../model/admin");
const { generateToken } = require("../../common/token");
const { compareData } = require("../../common/hash");
const admin = {};

admin.getAll = async (req, res, next) => {
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

admin.login = async (req, res, next) => {
    try{
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.password, "password is required");

        const data = await getOne(req.body.phonenumber);

        if(data)
        {
            const isPasswordSame = await compareData(req.body.password, data.password);
            if(isPasswordSame){
                const token = await generateToken(data._doc);
                res.status(200).json({
                    status : true,
                    message : "success",
                    data : {
                        user : data,
                        token
                    }
                });
            }else{
                throw new Error("incorrect password"); 
            }            
        }else {
            throw new Error("incorrect phonenumber");
        }
    }catch(e){
        next(e);
    }
};

admin.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.adminID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

admin.create = async (req, res, next) => {
    try{
        console.log('create api', req.body)
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.password, "password is required");
        assert(req.body.role, "role is required");

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

admin.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.adminID, req.body);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

admin.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.adminID);
        res.status(200).json({
            status : true,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

module.exports = admin;