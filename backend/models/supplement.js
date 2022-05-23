const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    
    price : {
        type : Number,
        required : true
    },

    weight : {
        type : Number,
        required : true
    },

    category : {
        type : String,
        required : true
    },
    availability : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Supplement', supplementSchema);