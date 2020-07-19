const assert = require("assert");
const moment  = require('moment');
const { getAll, getByID, createOne, edit, deleteOne, filterBy, filterByDelivery } = require("../../model/transactions");
const inventory = require("../../model/inventory"); 
const myUsers = require("../../model/my_users");
const transaction = {}; 
 
transaction.create = async (req, res, next) => {
    try{                            
        console.log(req.body);    
        req.body.pendingAmount = 0; 
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

function compare(a,b) {
    if(a.pendingAmount > b.pendingAmount){
        return -1
    } 
    return 1
}

transaction.getAll = async (req, res, next) => { 
    try{ 
        const { filters , organizationID } = req.body;
        if(filters) {
            const filterArray = [];
            if(filters.toDate && !filters.fromDate) {
                return res.status(200).json({
                    status: 2,
                    message: 'From date is missing'
                })
            }
            if(filters.fromDate && filters.toDate && (new Date(filters.fromDate) > new Date(filters.toDate))) {
                return res.status(200).json({
                    status: 2,
                    message: 'From date should be lesser than To Date'
                })
            }

            filterArray.push({organizationID});

            if(filters.userId && filters.userId.length){
                filterArray.push({"userId" : { "$in": filters.userId}} )
            }

            if(filters.status && filters.status.length){
                filterArray.push({"transactionCode": { "$in": filters.status}})
            }         

            if(filters.fromDate) {
                filterArray.push(
                    {"createdAt": {
                        $gte: filters.fromDate
                    } }
                )
            }

            if(filters.toDate) {
                filterArray.push(
                    {"createdAt": {
                        $lte: moment(filters.toDate).add(1, 'days').format('YYYY-MM-DD')
                    } }
                )
            }
            console.log(filterArray);

            let data = await filterBy(filterArray, -1 );
            if(filters.userId && filters.userId.length === 1) {
                data = data.sort(compare)
            }            
            res.status(200).json({
                status : 1,
                message : "success", 
                data : data
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


transaction.getAllScheduled = async (req, res, next) => { 
    try{ 
        const { filters , organizationID } = req.body;

        const filterArray = [];
        filterArray.push({organizationID});
        filterArray.push({"transactionCode": { "$in": [3]}});
      
        if(filters) {
            if(filters.toDate && !filters.fromDate) {
                return res.status(200).json({
                    status: 2,
                    message: 'From date is missing'
                })
            }
            if(filters.fromDate && filters.toDate && (new Date(filters.fromDate) > new Date(filters.toDate))) {
                return res.status(200).json({
                    status: 2,
                    message: 'From date should be lesser than To Date'
                })
            }                       

            if(filters.fromDate) {
                filterArray.push(
                    {"scheduledAt": {
                        $gte: filters.fromDate
                    } }
                )
            }

            if(filters.toDate) {
                filterArray.push(
                    {"scheduledAt": {
                        $lte: moment(filters.toDate).add(1, 'days').format('YYYY-MM-DD')
                    } }
                )
            }                  
        } else {
            filterArray.push(
                {"scheduledAt": {
                    $gte: moment().format('YYYY-MM-DD')
                } }
            )
        }
        console.log(filterArray);
        const data = await filterByDelivery(filterArray);
        res.status(200).json({
            status : 1,
            message : "success", 
            data
        });        
    } catch(e){
        next(e);
    }
}; 


transaction.updateStatus = async (req,res,next) => {
    try{                    
        const { transactionId }  = req.params;  
        const { transactionCode,  amountPaid } = req.body; 
        const storedData = await getByID(transactionId);
        let { items , totalAmount, pendingAmount, paidAmount, userType, userId } = storedData;

        if( (storedData.transactionCode !== 4 && storedData.transactionCode !== 5 ) && transactionCode === 6  ){
            return res.status(200).json({
                status: 2,
                message: "Illegal operation. To pay amout transaction should be delivered"
            })
        } else if(storedData.transactionCode !== 3 &&  transactionCode === 4) {
            return res.status(200).json({
                status: 2,
                message: "Illegal operation. cannot deliver non-approved transaction"
            })
        }
         else if(storedData.transactionCode === 3 &&  transactionCode === 4 ){
            const deliveredAt = new Date();
            for(let i= 0; i< items.length; i++ ){
                let { itemId } = items[i];
                const item = await inventory.getByID(itemId);
                console.log("======item",item);
                if(item){
                    item.instock = item.instock - items[i].quantity; 
                    await inventory.edit(itemId, item);
                }
            }            
            req.body.transactionStatus = "delivered";
            req.body.pendingAmount = totalAmount; 
            req.body.deliveredAt = deliveredAt; 
            if(userType === "myUser") {
                const userDetail = await myUsers.getByID(userId);
                console.log("My user ", userDetail);
                if(userDetail) {
                    userDetail.paymentPending = userDetail.paymentPending ? userDetail.paymentPending + totalAmount : totalAmount;
                    await myUsers.edit(userId, userDetail);
                    console.log("updated user");
                }
            }
        } else if((storedData.transactionCode === 4 || storedData.transactionCode === 5 ) && transactionCode === 6 ){
            console.log(paidAmount);
            if(!amountPaid) {
                return res.status(200).json({
                    status: 2,
                    message: 'Paid amount is missing'
                })
            }
            const paidAt = new Date();
            paidAmount += amountPaid;
            pendingAmount = totalAmount - paidAmount;
            if(pendingAmount < 0) {
                return res.status(200).json({
                    status: 2,
                    message: "Paid Amount is greater than pending amount"
                })
            }
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
            if(userType === "myUser") {
                const userDetail = await myUsers.getByID(userId);
                console.log("My user ", userDetail);
                if(userDetail) {
                    userDetail.paymentPending = userDetail.paymentPending ? userDetail.paymentPending - amountPaid : pendingAmount;
                    await myUsers.edit(userId, userDetail);
                    console.log("updated user");
                }
            }
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


transaction.setUpAll = async (req, res, next) => {
    try {
        console.log(req.body);
        const { userId, userType, gonextId } = req.body;
        let { amount } = req.body;        

        if(!userId) {
            res.status(200).json({
                status: 2,
                message: 'UserId is missing'
            })
        }
        if(!amount) {
            res.status(200).json({
                status: 2,
                message: 'Amount is missing'
            })
        }
        const filterArray = [];
        filterArray.push({organizationID: gonextId });
        filterArray.push({"userId" : { "$in": userId}} );
        filterArray.push({"transactionCode": { "$in": [4,5] }})
        const pendTrans = await filterBy(filterArray, 1);
        // console.log(pendTrans);
        const paidAt = new Date();
        for(const i in pendTrans){
            if(amount) {
                if(amount >= pendTrans[i].pendingAmount){
                    const paidAmount = pendTrans[i].pendingAmount;
                    amount -= paidAmount;
                    console.log("greater============",paidAmount, amount);
                    pendTrans[i].paidAmount += paidAmount;
                    pendTrans[i].pendingAmount = pendTrans[i].totalAmount - pendTrans[i].paidAmount;
                    pendTrans[i].transactionCode = 6;
                    pendTrans[i].transactionStatus = 'paid';
                    pendTrans[i].paidAt = paidAt;
                } else {
                    const pending = pendTrans[i].pendingAmount - amount;                    
                    console.log("lesser", pending, amount);
                    pendTrans[i].paidAmount += amount;
                    pendTrans[i].pendingAmount = pendTrans[i].totalAmount - pendTrans[i].paidAmount;
                    pendTrans[i].transactionCode = 5;
                    pendTrans[i].transactionStatus = 'partiallyPaid';
                    pendTrans[i].paidAt = paidAt;
                    amount = 0;
                }
                await edit( pendTrans[i]._id, pendTrans[i]);
                console.log(pendTrans[i]);              
            }
        }

        if(userType === "myUser") {
            const userDetail = await myUsers.getByID(userId);
            if(userDetail) {
                userDetail.paymentPending = userDetail.paymentPending ? userDetail.paymentPending -  req.body.amount :  pendTrans[i].pendingAmount;
                await myUsers.edit(userId, userDetail);
                console.log("updated user", req.body.amount, userDetail);
            }
        }

        res.status(200).json({
            status : 1,
            message : "success",            
        });
    } catch(e){
        next(e);
    }
}

 
module.exports = transaction;