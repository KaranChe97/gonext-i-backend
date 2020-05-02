const model = require("./model");

const service = {};

service.getAll = (data) => model.find(data);

service.getOne = (phonenumber) => model.findOne({ phonenumber });

service.createOne = (data) => model.create(data);

service.edit = (id,data) => model.findByIdAndUpdate({ _id : id }, data );

service.deleteOne = (phonenumber) => model.findByIdAndDelete({ phonenumber : phonenumber });


module.exports = service;