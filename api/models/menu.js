const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    menuName: { type: String, required: true },
    menuPrice: { type: String, required: true }
});

module.exports = mongoose.model('Menu', Schema);