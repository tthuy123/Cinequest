// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userListController');

// Define a route for getting user movie lists
router.get('/user-movie-lists', userController.getUserMovieLists);

// Define a route for getting a movie list

router.get('/movie-list/:id', userController.getMovieList);

// Define a route for creating a new list
router.post('/create-movie-list', userController.createList);

router.post('/add-film-to-list', userController.addFilmToList);

module.exports = router;
