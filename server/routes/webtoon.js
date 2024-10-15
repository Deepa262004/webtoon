import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import Webtoon from '../models/Webtoon.js';

const router = express.Router();

// Get All Webtoons
router.get('/', async (req, res) => {
    try {
        const webtoons = await Webtoon.find();
        res.json(webtoons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Webtoon by ID
router.get('/:id', async (req, res) => {
    try {
        const webtoon = await Webtoon.findById(req.params.id);
        if (!webtoon) return res.status(404).send('Webtoon not found');
        res.json(webtoon);
    } catch (error) {
        console.error("Error fetching webtoon:", error);
        res.status(500).send('Internal Server Error');
    }
});

// Create New Webtoon
router.post('/', async (req, res) => {
    const webtoon = new Webtoon({
        title: req.body.title,
        creator: req.body.creator,
        genre: req.body.genre,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        detailedDescription: req.body.detailedDescription,
        image: req.body.image,
        comments: req.body.comments || [] // Default to an empty array if no comments
    });

    try {
        const newWebtoon = await webtoon.save();
        res.status(201).json(newWebtoon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
