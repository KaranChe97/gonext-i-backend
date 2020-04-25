const basicMeasure = require("./basicMeasureModel");

const basicMeasureService = {};

basicMeasureService.getAll = (data) => basicMeasure.find(data).sort({ _id : -1 });

basicMeasureService.getByID = (id) => basicMeasure.findById({ _id : id });

basicMeasureService.createOne = (data) => basicMeasure.create(data);

basicMeasureService.createMany = (data) => basicMeasure.insertMany(data);

basicMeasureService.edit = (id,data) => basicMeasure.findByIdAndUpdate({ _id : id }, data );

basicMeasureService.deleteOne = (id) => basicMeasure.findByIdAndDelete({ _id : id });

module.exports = basicMeasureService;