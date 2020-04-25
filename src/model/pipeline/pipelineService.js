const pipeline = require("./pipelineModel");

const pipelineService = {};

pipelineService.getAll = (data) => pipeline.find(data).sort({ _id : -1 });

pipelineService.getByID = (id) => pipeline.findById({ _id : id });

pipelineService.createOne = (data) => pipeline.create(data);

pipelineService.createMany = (data) => pipeline.insertMany(data);

pipelineService.edit = (id,data) => pipeline.findByIdAndUpdate({ _id : id }, data );

pipelineService.deleteOne = (id) => pipeline.findByIdAndDelete({ _id : id });

module.exports = pipelineService;