const express = require('express');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.post('/menu-items', async (req, res) => {
  const { name, description, price, restaurantId } = req.body;

  if (!name || !price || !restaurantId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menuItem = new MenuItem({
      name,
      description,
      price,
      restaurant: restaurantId,
    });

    const newMenuItem = await menuItem.save();

    restaurant.menuItems.push(newMenuItem._id);
    await restaurant.save();

    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating menu item', error: err.message });
  }
});

module.exports = router;
