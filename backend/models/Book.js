const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    ISBN: { type: String, required: true },
    imageUrl: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Book', BookSchema);
