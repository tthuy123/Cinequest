const express = require('express');
const router = express.Router();
const filmsController = require('../controllers/filmsController');

// Định nghĩa tuyến đường cho trang danh sách phim
router.get('/films', filmsController.getAllFilms);
// Định nghĩa tuyến đường them phim da xem
router.post('/films/watched', filmsController.addToWatched);

router.post('/films/reviews', filmsController.addReview);


module.exports = router;