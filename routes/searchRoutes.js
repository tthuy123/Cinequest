// searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Define a route for searching movies by genre
router.get('/search-by-genre', searchController.searchFilmsByGenre);
router.get('/search-by-actor', searchController.searchFilmsByActor);


module.exports = router;
