const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

router.get('/restaurants', async (req, res) => {
  const { page = 1, limit = 250 } = req.query; // Obtener los parámetros de paginación (por defecto 1 página y 250 restaurantes)

  try {
    const restaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'restaurant',
          as: 'reviewsData',
        },
      },
      {
        $addFields: {
          averageRating: {
            $avg: '$reviewsData.rating',
          },
        },
      },
      {
        $project: {
          name: 1,
          address: 1,
          category: 1,
          phone: 1,
          menuItems: 1,
          location: 1,
          averageRating: 1,
        },
      },
      {
        $skip: (page - 1) * limit, // Saltar los documentos correspondientes a la página actual
      },
      {
        $limit: parseInt(limit), // Limitar a la cantidad de restaurantes por página
      },
    ]);

    // Obtener el total de restaurantes para poder calcular la cantidad de páginas
    const totalRestaurants = await Restaurant.countDocuments();

    // Calcular el total de páginas
    const totalPages = Math.ceil(totalRestaurants / limit);

    // Responder con los restaurantes y la información de paginación
    res.json({
      data: restaurants,
      pagination: {
        totalRestaurants,
        totalPages,
        currentPage: parseInt(page),
        perPage: parseInt(limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching restaurants', error: err.message });
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

router.post('/restaurants', async (req, res) => {
  const { name, address, category, phone, coordinates } = req.body;

  if (!name || !address || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const restaurant = new Restaurant({
      name,
      address,
      category,
      phone,
      location: {
        type: 'Point',
        coordinates: [coordinates.longitude, coordinates.latitude],
      },
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
  const { ids, name, address, category, phone, coordinates } = req.body;

  try {
    const updatePromises = ids.map((id) => {
      return Restaurant.findByIdAndUpdate(
        id,
        {
          name,
          address,
          category,
          phone,
          location: {
            type: 'Point',
            coordinates: [coordinates.longitude, coordinates.latitude], // [longitud, latitud]
          },
        },
        { new: true }
      );
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
