const assert = require("assert");
const { getAll, getByID, createOne, edit, deleteOne, filterBy } = require("../../model/transactions");
const inventory = require("../../model/inventory"); 

const transaction = {}; 
 
transaction.create = async (req, res, next) => {
    try{                            
        console.log(req.body);    
        console.log(new Date("Sat Jun 13 2020 12:34:01 GMT+0530 (IST)"));
        const { totalAmount } = req.body; 
        req.body.pendingAmount = totalAmount;
        req.body.paidAmount = 0;
        req.body.transactionStatus = 'new';
        req.body.transactionCode = 1;
        const data = await createOne(req.body);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    } catch(e){ 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};

transaction.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.params.transactionId);   
        if(data){
            res.status(200).json({  
                status : 1,
                message : "success",
                data
            });
        } else {
            res.status(200).json({
                status: 2,
                message: 'transaction not found'
            })
        }
    } catch(e){
        next(e);
    }
};

transaction.getAll = async (req, res, next) => { 
    try{ 
        const { filters , organizationID } = req.body;
        if(filters) {
            const filterArray = [];
            filterArray.push({organizationID})
            if(filters.userId && filters.userId.length){
                filterArray.push({"userId" : { "$in": filters.userId}} )
            }
            if(filters.status && filters.status.length){
                filterArray.push({"transactionCode": { "$in": filters.status}})
            }
            console.log(filterArray);
            const data = await filterBy(filterArray);
            res.status(200).json({
                status : 1,
                message : "success", 
                data
            });
        } else {
            console.log("organizationID", organizationID);
            const data = await getAll(organizationID);
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

transaction.updateStatus = async (req,res,next) => {
    try{                    
        const { transactionId }  = req.params;  
        const { transactionCode,  amountPaid } = req.body; 
        const storedData = await getByID(transactionId);
        let { items , totalAmount, pendingAmount, paidAmount } = storedData;
        if(storedData.transactionCode === 3 &&  transactionCode === 4 ){
            const deliveredAt = new Date();
            for(let i= 0; i< items.length; i++ ){
                let { itemId } = items[i];
                const item = await inventory.getByID(itemId);
                console.log("======item",item);
                item.instock = item.instock - items[i].quantity; 
                await inventory.edit(itemId, item);
            }
            req.body.transactionStatus = "delivered";
            req.body.deliveredAt = deliveredAt;
            
        } else if((storedData.transactionCode === 4 || storedData.transactionCode === 5 ) && transactionCode === 6 ){
            console.log(paidAmount);
            const paidAt = new Date();
            paidAmount += amountPaid;
            pendingAmount = totalAmount - paidAmount;
            if(!pendingAmount){
                req.body.transactionCode = 6;
                req.body.transactionStatus = 'paid'
            } else {
                req.body.transactionCode = 5;
                req.body.transactionStatus = 'partiallyPaid'                
            }
            req.body.paidAmount = paidAmount;
            req.body.pendingAmount = pendingAmount;
            req.body.paidAt = paidAt;
        }
        const data = await edit( transactionId, req.body);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    } catch(e){ 
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}



transaction.accept = async (req, res, next) => {
    try {
        const {transactionId} = req.params;
        console.log(new Date())
        const data = await edit ( transactionId, { transactionStatus: 'yetToDelivered', transactionCode: 3 });
        res.json({
            status: 1,
            message: "success",
            data
        });
       } catch(e){ 
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}

transaction.cancel = async (req, res, next) => {
    try {
        const {transactionId} = req.params;
        const { cancelledBy } = req.body;
        const data = await edit ( transactionId, { transactionStatus: 'cancelled', transactionCode: 2, cancelledBy });
        res.json({
            status: 1,
            message: "success",
            data
        });
       } catch(e){ 
        console.log(e); 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200; 
        }
        next(e);
    }
}


transaction.deleteOne = async (req, res, next) => {
    try{
        const data = await deleteOne(req.body._id);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    } catch(e){
        next(e);
    }
};

 
module.exports = transaction;