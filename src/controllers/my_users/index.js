const assert = require("assert");
const { getAll, getByID, createOne, edit, deleteOne, getOne } = require("../../model/my_users");
const model = require("../../model/my_users/myUsersModel");
const myUsers = {};

myUsers.getAll = async (req, res, next) => { 
    try{
        const data = await getAll(req.body.gonextId);
        res.status(200).json({
            status : 1,
            message : "success", 
            data
        });
    } catch(e){
        next(e);
    }
}; 

myUsers.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.userId);   
        if(data){
            res.status(200).json({  
                status : 1,
                message : "success",
                data
            });
        } else {
            res.status(200).json({
                status: 2,
                message: 'User not found'
            })
        }
    } catch(e){
        next(e);
    }
};

myUsers.create = async (req, res, next) => {
    try{
        req.body.organizationID = req.body.gonextId;
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.name, "name is required");
        assert(req.body.address, "address is required"); 
        assert(req.body.type, "type is required"); 
        assert.equal(req.body.type, "myUser", "User type should be myUser");     
        
        model.count({organizationID: req.body.organizationID, phonenumber: req.body.phonenumber}, async function (err,count) {
            if (err) {
                throw err                
            }

            if(count > 0) {
                res.status(200).json({
                    status: 0,
                    message: 'My users account already exists for this number'
                })
            } else {
                const data = await createOne(req.body);
                res.status(200).json({
                    status : 1,
                    message : "success",
                    data
                });
            }        
        })
       
    } catch(e){ 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};


myUsers.edit = async (req, res, next) => {    
    try{
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.name, "name is required");
        assert(req.body.address, "address is required"); 
        assert(req.body.type, "type is required"); 
        assert.equal(req.body.type, "myUser", "User type should be myUser");


        const checkData = await getOne(req.body.gonextId,req.body.phonenumber);

        if(checkData && (checkData._id != req.params.userId)) {
            res.status(200).json({
                status: 2,
                message: 'This phone number is used by another account'
            })      
        } else {
            const data = await edit(req.params.userId, req.body);
            res.status(200).json({
                status : 1,
                message : "success",
                data
            });            
        }
    } catch(e){
        next(e);
    }
};

myUsers.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.params.userId);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    } catch(e){
        next(e);
    }
};

module.exports = myUsers;