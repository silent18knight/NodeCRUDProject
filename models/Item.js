const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: false
    }
},
{
        timestamps : true
    }
);

module.exports = mongoose.model('Item', itemSchema);
