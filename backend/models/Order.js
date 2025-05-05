const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }, // ID del MenuItem
        name: { type: String, required: true }, // Nombre del menú item
        description: { type: String }, // Descripción del menú item
        price: { type: Number, required: true }, // Precio del menú item
        quantity: { type: Number, required: true }, // Cantidad del menú item
      },
    ],
    status: { type: String, enum: ['pending', 'in_process', 'completed', 'canceled'], default: 'pending' },
    total: { type: Number, required: true }, // Total de la orden
  },
  { timestamps: true }
);

// Puedes seguir utilizando índices según sea necesario
orderSchema.index({ status: 1, total: -1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
