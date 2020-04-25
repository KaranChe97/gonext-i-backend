const brainTrust = require("./brainTrustModel");

const brainTrustService = {};

brainTrustService.getAll = (data) => brainTrust.find(data).sort({ _id : -1 });

brainTrustService.getByID = (id) => brainTrust.findById({ _id : id });

brainTrustService.createOne = (data) => brainTrust.create(data);

brainTrustService.createMany = (data) => brainTrust.insertMany(data);

brainTrustService.edit = (id,data) => brainTrust.findByIdAndUpdate({ _id : id }, data );

brainTrustService.deleteOne = (id) => brainTrust.findByIdAndDelete({ _id : id });

module.exports = brainTrustService;