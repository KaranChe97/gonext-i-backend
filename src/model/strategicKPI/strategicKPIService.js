const strategicKPI = require("./strategicKPIModel");

const strategicKPIService = {};

strategicKPIService.getAll = (data) => strategicKPI.find(data).sort({ _id : -1 });

strategicKPIService.getByID = (id) => strategicKPI.findById({ _id : id });

strategicKPIService.createOne = (data) => strategicKPI.create(data);

strategicKPIService.createMany = (data) => strategicKPI.insertMany(data);

strategicKPIService.edit = (id,data) => strategicKPI.findByIdAndUpdate({ _id : id }, data );

strategicKPIService.deleteOne = (id) => strategicKPI.findByIdAndDelete({ _id : id });

module.exports = strategicKPIService;