const mongoose = require("mongoose");

const purchaseIdSchema = new mongoose.Schema({   
    _id: { type: String},
    sequence: { type: Number },
});

module.exports = mongoose.model("purchaseId",purchaseIdSchema); 