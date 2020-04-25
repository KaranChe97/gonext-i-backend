const valueChain = require("./valueChainModel");

const valueChainService = {};

valueChainService.getAll = (data) => valueChain.find(data).sort({ _id : -1 });

valueChainService.getByID = (id) => valueChain.findById({ _id : id });

valueChainService.createOne = (data) => valueChain.create(data);

valueChainService.createMany = (data) => valueChain.insertMany(data);

valueChainService.edit = (id,data) => valueChain.findByIdAndUpdate({ _id : id }, data );

valueChainService.deleteOne = (id) => valueChain.findByIdAndDelete({ _id : id });

module.exports = valueChainService;