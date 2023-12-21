
const Film = require('../models/Film');
const authenticateToken = require('../routes/authMiddleware.js');

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
                const film = films[0];
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
    addToWatched: async (req, res) => {
        try {
            
            const { filmId } = req.body;
            const userName = req.user.userName;
    
            Film.addToWatched(userName, filmId, (err, result) => {
                if (err) {
                    console.error('Error adding film to watched list: ', err.stack);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                res.status(200).json(result);
            });
        } catch (error) {
            console.error('Error in addToWatched:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    ,
    addReview: async (req, res) => {
        try {
            authenticateToken(req, res, async () => {
                const { filmId, rating, review } = req.body;
                const userInfo = req.user.userName; 

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