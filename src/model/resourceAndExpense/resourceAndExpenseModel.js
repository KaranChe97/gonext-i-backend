const mongoose = require("mongoose");

const resourceAndExpenseSchema = new mongoose.Schema({
    entity : {
        type : String,
        enum : ["LRED","CPL","LBS","TRI-C","LGC","SSLH"]
    },
    year : {
        type : Number 
    },
    totalEmployees : {
        type : Number
    },
    revenue : {
        type : Number
    },
    revenueDetail : [{
        key : { type : String },
        value : { type : Number }
    }],
    payroll : {
        type : Number
    },
    directCost : {
        type : Number
    },
    directCostDetail : [{
        key : { type : String },
        value : { type : Number }
    }],
    generalExpense : {
        type : Number
    },
    generalExpenseDetail : [{
        key : { type : String },
        value : { type : Number }
    }],
    resourceReview : {
        type : String
    },
    expenseReview : {
        type : String
    },
    valueReview : {
        type : String
    }
},{
    timestamps : true
});

module.exports = mongoose.model("resourceAndExpense",resourceAndExpenseSchema);