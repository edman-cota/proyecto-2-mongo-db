const express = require('express');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.get('/menu-items', async (req, res) => {
  const { restaurantId } = req.query;

  try {
    const menuItems = await MenuItem.find({ restaurant: restaurantId }).populate(
      'restaurant',
      'name address'
    );

    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items', error: err.message });
  }
});

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

router.put('/menu-items', async (req, res) => {
  const { ids, name, description, price, restaurantId } = req.body;

  try {
    const updatePromises = ids.map((id) => {
      return MenuItem.findByIdAndUpdate(
        id,
        { name, description, price, restaurant: restaurantId },
        { new: true }
      );
    });

    const updatedMenuItems = await Promise.all(updatePromises);

    if (updatedMenuItems.length === 0) {
      return res.status(404).json({ message: 'No MenuItems found to update' });
    }

    res.status(200).json(updatedMenuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error updating menu item', error: err.message });
  }
});

router.delete('/menu-items', async (req, res) => {
  const { ids } = req.body;

  try {
    const result = await MenuItem.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No MenuItems found to delete' });
    }

    res.status(200).json({ message: `${result.deletedCount} MenuItem(s) deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting menu item', error: err.message });
  }
});

router.get('/menu-items/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const menuItems = await MenuItem.find({
      $text: { $search: query },
    }).populate('restaurant', 'name address');

    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error searching menu items', error: err.message });
  }
});

module.exports = router;
