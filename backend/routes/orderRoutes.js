const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Endpoint para crear una orden
router.post('/orders', async (req, res) => {
  const { userId, items } = req.body;

  console.log('items: ', items);

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing required fields or items' });
  }

  try {
    // Obtener los detalles completos de los MenuItems seleccionados
    const menuItemsDetails = await MenuItem.find({ _id: { $in: items.map((item) => item.itemId) } });

    // Crear el objeto items con los detalles completos de los MenuItems
    const orderItems = items.map((item) => {
      const menuItem = menuItemsDetails.find((m) => m._id.toString() === item.itemId);
      return {
        itemId: menuItem._id,
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        quantity: item.quantity,
      };
    });

    // Calcular el total de la orden
    const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Crear la nueva orden
    const order = new Order({
      user: userId,
      items: orderItems,
      total,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

module.exports = router;
