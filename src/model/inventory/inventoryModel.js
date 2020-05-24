const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({   
        name : {type:  String},
        description: {type:  String},
        unit: {type: String},
        photos: {type:  String},
        instock: {type:  Number},
        cost: {type:  Number},
        organizationID: {type: String}  
},{
    timestamps : true
});

module.exports = mongoose.model("inventory",inventorySchema);