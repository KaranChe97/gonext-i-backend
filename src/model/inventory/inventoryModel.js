const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({   
        name : {type:  String},
        description: {type:  String},
        categoryId: { type: mongoose.Schema.Types.ObjectId },
        parentCategoryId: { type: mongoose.Schema.Types.ObjectId },
        // unit: {type: String},
        // photos: {type:  String},
        // instock: {type:  Number},
        // cost: {type:  Number},
        organizationID: {type: String},

        variant: [ { 
            name: { type: String },
            skuId: { type: mongoose.Schema.Types.ObjectId },
            image: { type: String },
            unit: { type: String },
            cost: { type: Number },
            instock: {type:  Number},
          } ]
},{
    timestamps : true
});

module.exports = mongoose.model("inventory",inventorySchema);

