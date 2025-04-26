const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Ruta para obtener todos los restaurantes
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener restaurantes', error: err });
  }
});

// Ruta para crear un restaurante
router.post('/restaurants', async (req, res) => {
  const { name, address, category, telephone } = req.body;
  const restaurant = new Restaurant({ name, address, category, telephone });
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear restaurante', error: err });
  }
});

module.exports = router;
