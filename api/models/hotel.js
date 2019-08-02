const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hotelName: {
        type: String,
        required: true,
    },
    categoryName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Hotel', Schema);