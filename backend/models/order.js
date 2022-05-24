const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    cName : {
        type : String,
        required : true
    },
    
    address : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true
    },

    date : {
        type : String,
        required : true
    },

    sName : {
        type : String,
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('Order', orderSchema);