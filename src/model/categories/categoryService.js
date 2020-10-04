const category = require("./categoryModal");

const categoryService = {};

categoryService.findOne = (condition, metrics) => category.findOne(condition, metrics).exec();

categoryService.getAll = (condition) => category.find({...condition});

categoryService.findByIdAndUpdate = (id, metrics) => category.findByIdAndUpdate(id, metrics);

categoryService.update = (condition, metrics, multi) => category.update(condition, metrics, multi);

categoryService.createOne = (data) => category.create(data); 

categoryService.createMany = (data) => category.insertMany(data);
 
categoryService.edit = (id, data) => category.findByIdAndUpdate({ _id : id }, data );

categoryService.deleteOne = (id) => category.findByIdAndRemove({ _id : id });

categoryService.deleteMany = (condition) => category.deleteMany(condition);

categoryService.aggregate = (condition) => category.aggregate(condition);


module.exports = categoryService; 