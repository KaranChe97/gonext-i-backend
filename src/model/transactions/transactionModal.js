const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({   
        organizationID: {type: mongoose.Schema.Types.ObjectId},
        userId : {type:  mongoose.Schema.Types.ObjectId},
        userName: {type: String},      
        userType: {
            type: String, 
            enum: ['myUser', 'user']
        }, 
        userDetails: {},     
        bookingType: {
            type:  String,
            enum: ['instant', 'later']
        },
        transactionStatus: {
            type: String,
            enum: ['new', 'cancelled', 'yetToDelivered', 'delivered', 'pending', 'partiallyPaid', 'paid']
        },
        items: [{ 
            itemId: {type: mongoose.Schema.Types.ObjectId},
            name: {type: String},
            cost: {type: Number},
            quantity: {type: Number}
        }],      
        totalAmount: { type: Number },
        paidAmount: { type: Number},
        pendingAmount: {type: Number},        
        scheduledAt: { type: Date },
        expectedDelivery: { type: Date },
        deliveredAt: { type: Date },
        paidAt: { type: Date },
        cancelledBy: { 
            type: String,
            enum: ['user', 'admin']
         },
},{
    timestamps : true 
});

module.exports = mongoose.model("transaction",transactionSchema); 