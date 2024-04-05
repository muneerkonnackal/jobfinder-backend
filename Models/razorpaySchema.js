const mongoose = require('mongoose');

const razorSchema = new mongoose.Schema({
    name: {
        type: 'String',
    },
    email:{
        type: 'String',
    },
    plan:{
        type: 'String',
    },
    amount: {
        type: 'Number',
    },
    order_id: {
        type: 'String',
    },
    razorpay_payment_id: {
        type: 'String',
        default: null,
    },
    razorpay_order_id: {
        type: 'String',
        default: null,
    },
    razorpay_signature: {
        type: 'String',
        default: null,
    },
}, {
    timestamps: true,
});

const payments = mongoose.model("Payments", razorSchema);
module.exports = payments; 
