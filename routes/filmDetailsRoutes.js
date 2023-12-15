const express = require('express');
const filmrouter = express.Router();
const filmsController = require('../controllers/filmsController');

// định nghĩa tuyến đường cho trang chi tiết phim
filmrouter.get('/films/:id', filmsController.getFilmDetails);
filmrouter.get('/reviews/:id',filmsController.showReviews);

module.exports = filmrouter;