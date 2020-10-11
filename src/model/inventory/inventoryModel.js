const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({   
        name : {type:  String},
        description: {type:  String},
        organizationID: {type: String},
        category: { type: String },
        variant: [ { 
            name: { type: String },
            photos: { type: String },
            unit: { type: String },
            cost: { type: Number },
            instock: {type:  Number},
          } ]
},{
    timestamps : true
});

module.exports = mongoose.model("inventory",inventorySchema);

