const finance = require("./financeModel");

const financeService = {};

financeService.getAll = (data) => finance.find(data).sort({ _id : -1 });

financeService.getByID = (id) => finance.findById({ _id : id });

financeService.createOne = (data) => finance.create(data);

financeService.createMany = (data) => finance.insertMany(data);

financeService.edit = (id,data) => finance.findByIdAndUpdate({ _id : id }, data );

financeService.deleteOne = (id) => finance.findByIdAndDelete({ _id : id });

module.exports = financeService;