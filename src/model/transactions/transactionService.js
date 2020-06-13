const transaction = require("./transactionModal");

const transactionService = {}; 

transactionService.getAll = (id) => transaction.find({organizationID: id}); 

transactionService.filterBy = (id, status, userIds) => transaction.find({
    $and:[
            {organizationID: id}, 
            {transactionStatus: { $in: status}},
            {userId : { $in: userIds}} 
        ] 
    });

transactionService.getByID = (id) => transaction.findById({ _id : id });

transactionService.createOne = (data) => transaction.create(data); 

transactionService.edit = (id,data) => transaction.findByIdAndUpdate({ _id : id }, data );

transactionService.deleteOne = (id) => transaction.findByIdAndDelete({ _id : id });

module.exports = transactionService;   