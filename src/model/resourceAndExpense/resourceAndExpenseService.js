const resourceAndExpense = require("./resourceAndExpenseModel");

const resourceAndExpenseService = {};

resourceAndExpenseService.getAll = (data) => resourceAndExpense.find(data).sort({ _id : -1 });

resourceAndExpenseService.getByID = (id) => resourceAndExpense.findById({ _id : id });

resourceAndExpenseService.createOne = (data) => resourceAndExpense.create(data);

resourceAndExpenseService.createMany = (data) => resourceAndExpense.insertMany(data);

resourceAndExpenseService.edit = (id,data) => resourceAndExpense.findByIdAndUpdate({ _id : id }, data );

resourceAndExpenseService.deleteOne = (id) => resourceAndExpense.findByIdAndDelete({ _id : id });

module.exports = resourceAndExpenseService;