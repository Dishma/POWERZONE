const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplementSchema = new Schema({

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
    }
})

const Supplement = mongoose.model("Supplement", supplementSchema);

module.exports = Supplement;