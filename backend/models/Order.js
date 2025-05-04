const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true },
      },
    ], // Cambiar a sin referencia
    status: { type: String, enum: ['pending', 'in_process', 'completed', 'canceled'], default: 'pending' },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

orderSchema.index({ status: 1, total: -1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
