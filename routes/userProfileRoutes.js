const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authenticateToken = require('./authMiddleware');

// Define routes for recently watched movies 
router.get('/recently-watched', authenticateToken, userProfileController.getUserRecentlyWatchedMovies);

// Define routes for recent reviews
router.get('/recent-reviews', authenticateToken, userProfileController.getUserRecentReviews);

module.exports = router;
