const competitiveAdvantage = require("./competitiveAdvantageModel");

const competitiveAdvantageService = {};

competitiveAdvantageService.getAll = (data) => competitiveAdvantage.find(data).sort({ _id : -1 });

competitiveAdvantageService.getByID = (id) => competitiveAdvantage.findById({ _id : id });

competitiveAdvantageService.createOne = (data) => competitiveAdvantage.create(data);

competitiveAdvantageService.createMany = (data) => competitiveAdvantage.insertMany(data);

competitiveAdvantageService.edit = (id,data) => competitiveAdvantage.findByIdAndUpdate({ _id : id }, data );

competitiveAdvantageService.deleteOne = (id) => competitiveAdvantage.findByIdAndDelete({ _id : id });

module.exports = competitiveAdvantageService;