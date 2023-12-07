// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userListController');
const authenticateToken = require('./authMiddleware');


//router.use(authenticateToken);


// Define a route for getting user movie lists
router.get('/user-movie-lists', authenticateToken, userController.getUserMovieLists);

// Define a route for getting a movie list

router.get('/movie-list/:id', userController.getMovieList);

// Define a route for creating a new list
router.post('/create-movie-list', authenticateToken, userController.createList);

router.post('/add-film-to-list',authenticateToken, userController.addFilmToList);

module.exports = router;
