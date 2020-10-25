const Category = require("./categoryModal");

const categoryService = {};

categoryService.findOne = (condition) => Category.find(condition).exec();
 
categoryService.getAll = (condition) => Category.find({...condition}).sort({ name: 1 }).exec();

categoryService.createOne = (data) => Category.create(data);

categoryService.update = (id, data) => Category.findByIdAndUpdate({ _id: id }, data);

categoryService.deleteOne = (id) => Category.findByIdAndRemove({ _id: id });


module.exports = categoryService; 