const inventory = require("./inventoryModel");

const inventoryService = {};

inventoryService.getAll = (id) => inventory.find({organizationID: id});

inventoryService.getByID = (id) => inventory.findById({ _id : id });

inventoryService.createOne = (data) => inventory.create(data); 

inventoryService.createMany = (data) => inventory.insertMany(data);
 
inventoryService.edit = (id,data) => inventory.findByIdAndUpdate({ _id : id }, data );

inventoryService.deleteOne = (id) => inventory.findByIdAndDelete({ _id : id });

module.exports = inventoryService; 