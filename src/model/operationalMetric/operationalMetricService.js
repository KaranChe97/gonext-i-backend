const operationalMetric = require("./operationalMertricModel");

const operationalMetricService = {};

operationalMetricService.getAll = (data) => operationalMetric.find(data).sort({ _id : -1 });

operationalMetricService.getByID = (id) => operationalMetric.findById({ _id : id });

operationalMetricService.createOne = (data) => operationalMetric.create(data);

operationalMetricService.createMany = (data) => operationalMetric.insertMany(data);

operationalMetricService.edit = (id,data) => operationalMetric.findByIdAndUpdate({ _id : id }, data );

operationalMetricService.deleteOne = (id) => operationalMetric.findByIdAndDelete({ _id : id });

module.exports = operationalMetricService;