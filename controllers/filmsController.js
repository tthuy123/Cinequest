// xu ly logic

const Film = require('../models/Film');
const authenticateToken = require('../routes/authMiddleware.js'); // Import your actual authentication middleware


const filmsController = {
    getAllFilms: (req, res) => {
        const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    Film.getAllFilms(offset, limit, (err, films) => {
        if (err) {
            console.error('Error getting movies: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(films);
            
          // res.render('films/list', { film });

            // Tạo một đoạn HTML đơn giản để hiển thị danh sách phim
    // let htmlContent = '<h1>Films List</h1><ul>';
    // film.forEach(film => {
    //   htmlContent += `<li>${film.title}</li>`;
    // });
    // htmlContent += '</ul>';

    // // Trả về nội dung HTML trực tiếp
    // res.send(htmlContent);
           
        });
    },
    getFilmDetails: (req, res) => {
        const idfilm = req.params.id;
        Film.getFilmDetails(idfilm, (err, films) => {
            console.log(films);
            if (err) {
                console.error('Error getting movies: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            //res.json(films);
            if (films.length > 0) {
                const film = films[0];  // Access the first element of the array
                res.json(film);
            } else {
                res.status(404).send('Film not found');
            }
});
    },
    showReviews: (req, res) => {
        const idfilm = req.params.id;
        Film.showReviews(idfilm, (err, reviews) => {
            console.log(reviews);
            if (err) {
                console.error('Error getting movies: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
           res.json(reviews)
});
    },
    addToWatched: (req, res) => {
        const { userName, filmId } = req.body;

        Film.addToWatched(userName, filmId, (err, result) => {
            if (err) {
                console.error('Error adding film to watched list: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).json(result);
        });
    },
    addReview: async (req, res) => {
        try {
            // Sử dụng middleware để xác minh token
            authenticateToken(req, res, async () => {
                // Nếu token hợp lệ, bạn có thể tiếp tục xử lý thêm review
                const { filmId, rating, review } = req.body;
                const userInfo = req.user.userName; // Lấy thông tin người dùng từ middleware

                // Sử dụng thông tin người dùng và các thông tin khác để thêm review
                Film.addReview(userInfo, filmId, rating, review, (err, result) => {
                    if (err) {
                        console.error('Error adding review: ', err.stack);
                        res.status(500).send('Internal Server Error');
                        return;
                    }

                    res.status(200).json(result);
                });
            });
        } catch (error) {
            console.error('Error in addReview:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = filmsController;