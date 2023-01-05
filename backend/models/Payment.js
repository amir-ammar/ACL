
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    sessionId:{
        type:String,
        required:[true,"please provide stripe session id"]
    },
    paymentId:{
        type:String,
        required:[true,"please add payment id"]
    },
    customerId:{
        type:String,
        required:[true,"please add customer id"]
    }
},{timestamps:true});

module.exports = mongoose.model("PaymentModel",PaymentSchema);


