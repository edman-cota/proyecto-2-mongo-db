const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.itemId', 'name price');

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

router.post('/orders', async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing required fields or items' });
  }

  try {
    const menuItemsDetails = await MenuItem.find({ _id: { $in: items.map((item) => item.itemId) } });

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

    const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
