const idea = require("./ideaModel");

const ideaService = {};

ideaService.getAll = (data) => idea.find(data).sort({ _id : -1 });

ideaService.getByID = (id) => idea.findById({ _id : id });

ideaService.createOne = (data) => idea.create(data);

ideaService.createMany = (data) => idea.insertMany(data);

ideaService.edit = (id,data) => idea.findByIdAndUpdate({ _id : id }, data );

ideaService.deleteOne = (id) => idea.findByIdAndDelete({ _id : id });

ideaService.deleteMany = (brainTrust) => idea.deleteMany({ brainTrust });

module.exports = ideaService;