const units = require('./unitsModal');

const unitService = {};

unitService.getAll = () => units.find();

unitService.create = (data) => units.create(data);

unitService.modify = (id, data) => units.findByIdAndUpdate({ _id : id }, data );

unitService.remove = (id) => units.findByIdAndDelete({ _id : id });

module.exports = unitService;
