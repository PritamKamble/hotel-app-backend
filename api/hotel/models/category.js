const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: { type: String, required: true },
    menuName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }]
});

module.exports = mongoose.model('Category', Schema);