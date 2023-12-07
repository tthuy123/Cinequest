// searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Define a route for searching movies by genre
// Trong tệp route.js hoặc tệp tương tự
router.get('/search-by-title', searchController.searchFilmsByTitle);
router.get('/search-by-year-rage',searchController.searchFilmsByYearRange);
router.get('/search-by-genre', searchController.searchFilmsByGenre);
router.get('/search-by-actor', searchController.searchFilmsByActor);
router.get('/search-by-genre-and-year-rage', searchController.searchFilmsByGenreAndYearRange);
router.get('/search-newest-film', searchController.searchNewestFilm);


module.exports = router;
