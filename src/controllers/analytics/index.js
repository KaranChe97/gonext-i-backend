const assert = require("assert");
const moment  = require('moment');
const { getAll, getByID, filterBy, filterByDelivery } = require("../../model/transactions");
const inventory = require("../../model/inventory"); 

const analytics = {};


analytics.homeDashboard = async (req, res, next) => {
    try{                            
        console.log(req.body);    
        const { gonextId } = req.body;
        const filterArray = [];               
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');

        filterArray.push({organizationID: gonextId});
        filterArray.push(
            {"createdAt": {
                $gte: startOfMonth
            } }
        );
        filterArray.push(
            {"createdAt": {
                $lte: endOfMonth
            } }
        );                
        filterArray.push({"transactionCode": { "$in": [5,6]}});
        console.log(filterArray);

        const data = await filterBy(filterArray, -1 );
        let revenue = data.reduce((monthlyRevenue, a) => monthlyRevenue + a.paidAmount, 0 );

        const filter2 = [];
        filter2.push({organizationID: gonextId});
        filter2.push({"transactionCode": { "$in": [4,5]}}); 
        
        const pendingTransactions = await filterBy(filter2, -1);

        let pendingAmount = pendingTransactions.reduce((pending, a) => pending + a.pendingAmount, 0);
        res.status(200).json({
            status : 1,
            message : "success",
            revenue,
            pendingAmount
        });

    } catch(e){ 
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    } 
};


module.exports = analytics;
