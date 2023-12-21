const Film = require('../models/Film');

const searchFilmsByGenre = (req, res) => {
    try {
        const { genre, offset, limit } = req.query;

        const parsedOffset = parseInt(offset) || 0;
        const parsedLimit = parseInt(limit) || 10; 

        Film.searchFilmsByGenre(genre, parsedOffset, parsedLimit, (err, movies) => {
            if (err) {
                console.error('Error searching movies by genre: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json( movies );
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Internal Server Error');
    }
};
const searchFilmsByGenreAndYearRange = (req, res) => {
    try {
        const { genre, fromYear, toYear, offset, limit } = req.query;
        console.log( genre,fromYear, toYear);
        const parsedOffset = parseInt(offset) || 0;
        const parsedLimit = parseInt(limit) || 10; 
        Film.searchFilmsByGenreAndYearRange(genre, fromYear, toYear, parsedOffset, parsedLimit, (err, movies) => {
            if (err) {
                console.error('Error searching movies by genre and year rage: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json( movies );
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const searchFilmsByYearRange = (req, res) => {
    const { fromYear, toYear, offset, limit } = req.query;
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 10; 

    console.log(fromYear, toYear);

    Film.searchFilmsByYearRange(fromYear, toYear, parsedOffset, parsedLimit, (err, movies) => {
        if (err) {
            console.error('Error searching movies by year range: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json( movies);
    });
};
const searchNewestFilm = (req, res) => {    
    const { offset, limit } = req.query;
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 10; // You can adjust the default limit

    Film.searchNewestFilm(parsedOffset, parsedLimit, (err, movies) => {
        if (err) {
            console.error('Error searching movies by year range: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json( movies);
    });
}
const searchMostRateFilm = (req, res) => {
    const { offset, limit } = req.query;
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 10; 
    Film.searchMostRateFilm(parsedOffset, parsedLimit, (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};
const searchPopularFilm = (req, res) => {
    const { offset, limit } = req.query;
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 10; 
    Film.searchPopularFilm(parsedOffset, parsedLimit, (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};
  
const searchFilmsByActor = (req, res) => {
    const { actor } = req.query;

    Film.searchFilmsByActor(actor, (err, movies) => {
        if (err) {
            console.error('Error searching movies by actor: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(movies);
    });
};
const searchFilmsByTitle = (req, res) => {
    const { title } = req.query;
  
    Film.searchFilmsByTitle(title, (err, movies) => {
      if (err) {
        console.error('Error searching movies by title: ', err.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json(movies );
    });
  };

module.exports = {
    searchFilmsByGenre, searchFilmsByActor, searchFilmsByTitle, 
    searchFilmsByYearRange, searchFilmsByGenreAndYearRange, searchNewestFilm,
    searchMostRateFilm, 
    searchPopularFilm,
};
