const boardEffectiveness = require("./boardEffectivenessModel");

const boardEffectivenessService = {};

boardEffectivenessService.getAll = (data) => boardEffectiveness.find(data);

boardEffectivenessService.getAllByAggregate = (data) => boardEffectiveness.aggregate([
    { $sort : { _id : - 1 }},
    { $group : { _id : "$name", data: { $push: "$$ROOT" } } },
    { $sort : { _id : 1 }}
  ]);

boardEffectivenessService.getByID = (id) => boardEffectiveness.findById({ _id : id });

boardEffectivenessService.createOne = (data) => boardEffectiveness.create(data);

boardEffectivenessService.createMany = (data) => boardEffectiveness.insertMany(data);

boardEffectivenessService.edit = (id,data) => boardEffectiveness.findByIdAndUpdate({ _id : id }, data );

boardEffectivenessService.deleteOne = (id) => boardEffectiveness.findByIdAndDelete({ _id : id });

module.exports = boardEffectivenessService;