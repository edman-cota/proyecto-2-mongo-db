const express = require('express');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
const router = express.Router();

router.post('/reviews', async (req, res) => {
  const { userId, restaurantId, rating, comment } = req.body;

  try {
    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(restaurantId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const review = new Review({
      user: userId,
      restaurant: restaurantId,
      rating,
      comment,
    });

    const savedReview = await review.save();

    restaurant.reviews.push(savedReview._id);
    await restaurant.save();

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
});

router.get('/reviews/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

module.exports = router;
