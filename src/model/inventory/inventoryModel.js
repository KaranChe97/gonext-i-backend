const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({   
        name : {type:  String},
        description: {type:  String},
        organizationID: {type: String},
        category: { type: mongoose.ObjectId , ref: 'category' }, 
        photos: [{ type: String }], 
        variant: [ { 
            unit: { type: String }, 
            cost: { type: Number },
            instock: {type:  Number}, 
          } ]   
},{ 
    timestamps : true 
});

module.exports = mongoose.model("inventory",inventorySchema);

