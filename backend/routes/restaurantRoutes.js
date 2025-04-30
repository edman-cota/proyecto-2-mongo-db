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

router.delete('/restaurants/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting restaurant', error: err.message });
  }
});

router.put('/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, category, phone } = req.body;

  if (!name || !address || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, address, category, phone },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ message: 'Error updating restaurant', error: err.message });
  }
});

module.exports = router;
