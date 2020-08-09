const mongoose = require("mongoose");

const companyIdSchema = new mongoose.Schema({   
    _id: { type: String},
    sequence: { type: Number },
});

module.exports = mongoose.model("companyId",companyIdSchema);  