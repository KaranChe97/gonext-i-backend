const profile = require("./profileModel");

const profileService = {};

profileService.getAll = (data) => profile.find(data).sort({ _id : -1 });

profileService.getByID = (id) => profile.findById({ _id : id });

profileService.createOne = (data) => profile.create(data);

profileService.createMany = (data) => profile.insertMany(data);

profileService.edit = (id,data) => profile.findByIdAndUpdate({ _id : id }, data );

profileService.deleteOne = (id) => profile.findByIdAndDelete({ _id : id });

profileService.deleteMany = (brainTrust) => profile.deleteMany({ brainTrust });

module.exports = profileService;