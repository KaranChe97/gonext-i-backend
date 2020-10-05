const Tags = require("./tagModal");

const tagService = {};

tagService.findOne = (condition) => Tags.find(condition).exec();
 
tagService.getAll = (condition) => Tags.find({...condition}).sort({ name: 1 });

tagService.createOne = (data) => Tags.create(data);

tagService.updateTag = (id, data) => Tags.findByIdAndUpdate({ _id: id }, data);

tagService.deleteTag = (id) => Tags.findByIdAndRemove({ _id: id });

module.exports = tagService; 