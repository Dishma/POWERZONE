const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({

    memberName: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    weight: {
        type: String,
        required: true
    },

    height: {
        type: String,
        required: true
    },

    joiningDate: {
        type: String,
        required: true
    },

    otherDetails: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Members', memberSchema);