const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  score: { type: Number, required: true },
  comment: { type: String },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
