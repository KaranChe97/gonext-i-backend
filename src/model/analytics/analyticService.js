const transaction = require("../transactions/transactionModal");

const analyticService = {}; 


analyticService.filterBy = (filterArray, order) => transaction.find({
        $and:filterArray
    }).sort({ _id: order});

analyticService.pendingAll = (filterArray) => transaction.aggregate([
    {
        $match: { $and: filterArray }
    },
    {
        $group:  {
            _id:{ userId: "$userId", type: "$userType" },
            pendingAmount : { $sum: "$pendingAmount" },
         }          
    }  
])


analyticService.revenue = (filterArray) => transaction.aggregate([
    {
        $match: { $and: filterArray }
    },
    {
        $group:  {
            _id:{ year: { $year: "$createdAt"}, month: { $month : "$createdAt" } },
            revenue : { $sum: "$paidAmount" },
         }        
    },    
])



module.exports = analyticService;   