 const purchaseId = require('./purchaseIdModal');

 const purchaseService = {};

 purchaseService.createPurchaseId = (data) =>  purchaseId.create(data);

 purchaseService.findAndIncrement = (companyId) => purchaseId.findOneAndUpdate(
         {_id: companyId },
         {$inc:{sequence:1}},
         { new:true }
        )

purchaseService.isCollectionExist = (companyId) => purchaseId.findById({ _id: companyId });

 module.exports = purchaseService;