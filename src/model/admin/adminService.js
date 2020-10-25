const admin = require("./adminModel");

const adminService = {};

adminService.getAll = (data) => admin.find(data).populate("companyTags");

adminService.getOne = (phonenumber) => admin.findOne({ phonenumber }).populate("companyTags");

adminService.getByID = (id) => admin.findById({ _id : id }).populate("companyTags").exec(); 

adminService.createOne = (data) => admin.create(data); 

adminService.edit = (id,data) => admin.findByIdAndUpdate({ _id : id }, data );

adminService.deleteOne = (id) => admin.findByIdAndDelete({ _id : id });

adminService.checkCompanyId = (companyId) => admin.findOne({ companyId });

module.exports = adminService;  