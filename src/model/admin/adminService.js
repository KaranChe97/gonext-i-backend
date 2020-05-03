const admin = require("./adminModel");

const adminService = {};

adminService.getAll = (data) => admin.find(data);

adminService.getOne = (phonenumber) => admin.findOne({ phonenumber });

adminService.getByID = (id) => admin.findById({ _id : id });

adminService.createOne = (data) => admin.create(data);

adminService.edit = (id,data) => admin.findByIdAndUpdate({ _id : id }, data );

adminService.deleteOne = (id) => admin.findByIdAndDelete({ _id : id });


module.exports = adminService; 