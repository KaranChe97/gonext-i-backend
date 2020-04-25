const audit = require("./auditModel");

const auditService = {};

auditService.getAll = (data) => audit.find(data);

auditService.getAllByAggregate = (data) => audit.aggregate([
    { $sort : { _id : - 1 }},
    { $group : { _id : "$department", data: { $push: "$$ROOT" } } },
    { $sort : { _id : 1 }},
  ]);

auditService.getByID = (id) => audit.findById({ _id : id });

auditService.createOne = (data) => audit.create(data);

auditService.createMany = (data) => audit.insertMany(data);

auditService.edit = (id,data) => audit.findByIdAndUpdate({ _id : id }, data );

auditService.deleteOne = (id) => audit.findByIdAndDelete({ _id : id });

module.exports = auditService;