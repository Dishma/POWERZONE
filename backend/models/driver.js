const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({

    
    fName : {
        type : String,
        required : true
    },
    lName : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    }

})

const Driver = mongoose.model("Driver",driverSchema);

module.exports = Driver;