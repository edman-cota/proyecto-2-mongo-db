const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  telephone: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
