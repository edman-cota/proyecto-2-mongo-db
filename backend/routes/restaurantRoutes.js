const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener restaurantes', error: err });
  }
});

router.get('/restaurants/search', async (req, res) => {
  const { name } = req.query;

  try {
    const restaurantes = await Restaurant.find({ name: { $regex: name, $options: 'i' } }); // Búsqueda insensible a mayúsculas/minúsculas
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for restaurants', error: error.message });
  }
});

// Ruta para crear un restaurante
router.post('/restaurants', async (req, res) => {
  const { name, address, category, phone } = req.body;

  if (!name || !address || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const restaurant = new Restaurant({
      name,
      address,
      category,
      phone,
    });

    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear restaurante', error: err });
  }
});

router.delete('/restaurants', async (req, res) => {
  const { ids } = req.body;

  try {
    const result = await Restaurant.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No Restaurants found to delete' });
    }

    res.status(200).json({ message: `${result.deletedCount} Restaurants(s) deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting restaurant', error: err.message });
  }
});

router.put('/restaurants', async (req, res) => {
  const { ids, name, address, category, phone } = req.body;

  try {
    const updatePromises = ids.map((id) => {
      return Restaurant.findByIdAndUpdate(id, { name, address, category, phone }, { new: true });
    });

    const updatedRestaurants = await Promise.all(updatePromises);

    if (updatedRestaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants found to update' });
    }

    res.status(200).json(updatedRestaurants);
  } catch (err) {
    res.status(500).json({ message: 'Error updating restaurants', error: err.message });
  }
});

module.exports = router;
