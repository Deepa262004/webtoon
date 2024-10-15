 // routes/favorites.js
import express from 'express';
const router = express.Router();
import Favorite from '../models/fav.js';
import { authenticateUser } from '../jwt.js';
 // Import authentication middleware

// Middleware to authenticate user
router.use(authenticateUser);

// Add a favorite
router.post('/', async (req, res) => {
  const { webtoonId } = req.body;
  const userId = req.user._id; // Get the user ID from the authenticated request

  try {
    const favorite = new Favorite({ userId, webtoonId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorite', error });
  }
});

// Get favorites for a user
router.get('/', async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await Favorite.find({ userId }).populate('webtoonId'); // Populate with webtoon details if needed
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
});

// Remove a favorite
router.delete('/:webtoonId', async (req, res) => {
  const userId = req.user._id;
  const { webtoonId } = req.params;

  try {
    await Favorite.deleteOne({ userId, webtoonId });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite', error });
  }
});

export default router;
