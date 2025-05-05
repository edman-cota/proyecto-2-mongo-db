const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }, // ID del MenuItem
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, enum: ['pending', 'in_process', 'completed', 'canceled'], default: 'pending' },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

orderSchema.index({ status: 1, total: -1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
