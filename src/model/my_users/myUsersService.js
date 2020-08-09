
const myUsers = require("./myUsersModel");

const myUsersService = {}; 

myUsersService.getAll = (id) => myUsers.find({organizationID: id});

myUsersService.getOne = (id, phonenumber) => myUsers.findOne({$and:[{organizationID: id}, {phonenumber: phonenumber}] });

myUsersService.getByID = (id) => myUsers.findById({ _id : id });

myUsersService.createOne = (data) => myUsers.create(data); 

myUsersService.edit = (id,data) => myUsers.findByIdAndUpdate({ _id : id }, data );
 
myUsersService.deleteOne = (id) => myUsers.findByIdAndDelete({ _id : id }); 


myUsersService.getUsers = (userIds) => myUsers.find({ _id:  { "$in": userIds }  });

module.exports = myUsersService;  