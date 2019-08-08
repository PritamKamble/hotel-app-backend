const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: { type: String, required: true },
    hotel: { type: String, required: true },
    orders: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    count: { type: Number, required: true }
});

module.exports = mongoose.model('Order', Schema);