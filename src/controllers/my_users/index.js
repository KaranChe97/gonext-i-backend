const assert = require("assert");
const { getAll, getByID, createOne, edit, deleteOne, getOne } = require("../../model/my_users");
const { edit: editTransactions, filterBy:allTransactions, } = require("../../model/transactions");
const model = require("../../model/my_users/myUsersModel");
const inventoryModel = require("../../model/inventory");
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

myUsers.createPurchaseInit = async(req, res, next) => {
    try{
        const users = await getAll(req.body.gonextId);
        const inventoryData = await inventoryModel.getAll(req.body.gonextId);
        res.status(200).json({
            status : 1,
            message : "success", 
            users,
            inventoryData
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

myUsers.deleteCheck = async(req, res, next) => {
    try {
        const { gonextId } = req.body;
        const { userId } = req.params;
        const filterArray = [];
        filterArray.push({organizationID: gonextId }, {"userId" : { "$in": userId}},{"transactionCode": { "$in": [1,3,4,5]}} );
        const data = await allTransactions(filterArray, -1);
        res.status(200).json({
            status : 1,
            message : "success",
            transactionsPending: data.length,
        });
    } catch(e){
        next(e);
    } 
}

myUsers.deleteOne = async (req, res, next) => {
    try{
        const { gonextId } = req.body;
        const { userId } = req.params;
        const newFilter = [];
        const oldFilter = [];
        newFilter.push({organizationID: gonextId }, {"userId" : { "$in": userId}},{"transactionCode": { "$in": [1,3]}} );
        oldFilter.push({organizationID: gonextId }, {"userId" : { "$in": userId}},{"transactionCode": { "$in": [4,5]}} );
   
        const newOrders =  await allTransactions(newFilter, -1 );
        const deliveredOrders = await allTransactions(oldFilter, -1);

        for (const i in newOrders){           
            const transactionId = newOrders[i]._id;
            await editTransactions ( transactionId, { transactionStatus: 'cancelled', transactionCode: 2, cancelledBy: 'admin' });
        }

        for (const j in deliveredOrders){
            const transactionId = deliveredOrders[j]._id;
            const paidAmount = deliveredOrders[j].totalAmount;
            const pendingAmount = 0;
            await editTransactions (transactionId, {transactionStatus: 'paid', transactionCode: 6, paidAmount, pendingAmount  })
        }
        const data = await deleteOne(userId);
        res.status(200).json({
            status : 1,
            message : "success",
            data,
            transactionsCancelled: newOrders.length,
            transactionsPaid: deliveredOrders.length           
        });
    } catch(e){
        next(e);
    }
};

module.exports = myUsers;