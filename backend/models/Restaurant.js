const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: String, required: true },
    phone: { type: String },
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

restaurantSchema.index({ name: 1 });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
