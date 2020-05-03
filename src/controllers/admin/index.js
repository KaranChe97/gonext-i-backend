const assert = require("assert");
const { getAll, getOne, getByID, createOne, edit, deleteOne } = require("../../model/admin");
const { generateToken } = require("../../common/token");
const { compareData } = require("../../common/hash");

const admin = {};

admin.getAll = async (req, res, next) => {
    try{
        const data = await getAll();
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    } 
}; 

admin.login = async (req, res, next) => {
    try{
        console.log("called")
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.password, "password is required");

        const data = await getOne(req.body.phonenumber);

        if(data)
        {
            const isPasswordSame = await compareData(req.body.password, data.password);
            if(isPasswordSame){
                const token = await generateToken(data._doc);
                res.status(200).json({
                    status : 1,
                    message : "success",
                    data : {
                        user : data,
                        token
                    }
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message : 'Incorrect Password',
                })
            }            
        } else {
            res.status(200).json({
                status: 2,
                message: 'Account not exist. Please signup.'
            })
        }
    } catch(e){
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};

admin.getOne = async (req, res, next) => {
    try{
        console.log(req);
        const data = await getByID(req.params.adminID);
        res.status(200).json({
            status : 1,
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
        assert(req.body.name, "Name is required");
        const isExist = await getOne(req.body.phonenumber);
        if(isExist) {
            res.status(200).json({
                status: 0,
                message: 'Phone number already exist.'
            })
        }
        const data = await createOne(req.body);
        res.status(200).json({
            status : 1, 
            message : "success",
            data
        });
    } catch(e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        if(e.message === 'Phone number already exist.') {
            e.errCode = 2;
        }
        next(e);
    }
};

admin.edit = async (req, res, next) => {
    try{
        const data = await edit(req.params.adminID, req.body);
        res.status(200).json({
            status : 1,
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
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};


module.exports = admin;