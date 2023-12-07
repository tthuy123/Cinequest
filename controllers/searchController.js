// searchController.js
const Film = require('../models/Film');

const searchFilmsByGenre = (req, res) => {
    try {
        const { genre, offset, limit } = req.query;

        // Set default values for offset and limit if not provided
        const parsedOffset = parseInt(offset) || 0;
        const parsedLimit = parseInt(limit) || 10; // You can adjust the default limit

        // Call the function in your model or database layer to perform the search
        Film.searchFilmsByGenre(genre, parsedOffset, parsedLimit, (err, movies) => {
            if (err) {
                console.error('Error searching movies by genre: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Send the movies as a response
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
        // Set default values for offset and limit if not provided
        const parsedOffset = parseInt(offset) || 0;
        const parsedLimit = parseInt(limit) || 10; // You can adjust the default limit

        // Call the function in your model or database layer to perform the search
        Film.searchFilmsByGenreAndYearRange(genre, fromYear, toYear, parsedOffset, parsedLimit, (err, movies) => {
            if (err) {
                console.error('Error searching movies by genre and year rage: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Send the movies as a response
            res.json( movies );
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const searchFilmsByYearRange = (req, res) => {
    const { fromYear, toYear, offset, limit } = req.query;
    // Set default values for offset and limit if not provided
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 10; // You can adjust the default limit

    console.log(fromYear, toYear);

    // Call a function in your model or database layer to perform the search
    Film.searchFilmsByYearRange(fromYear, toYear, parsedOffset, parsedLimit, (err, movies) => {
        if (err) {
            console.error('Error searching movies by year range: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Respond with the search results in JSON format
        res.json( movies);
    });
};
const searchNewestFilm = (req, res) => {    
    const { offset, limit } = req.query;
    // Set default values for offset and limit if not provided
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 10; // You can adjust the default limit

    // Call a function in your model or database layer to perform the search
    Film.searchNewestFilm(parsedOffset, parsedLimit, (err, movies) => {
        if (err) {
            console.error('Error searching movies by year range: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Respond with the search results in JSON format
        res.json( movies);
    });
}
  
const searchFilmsByActor = (req, res) => {
    const { actor } = req.query;

    // Call a function in your model or database layer to perform the search
    Film.searchFilmsByActor(actor, (err, movies) => {
        if (err) {
            console.error('Error searching movies by actor: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Respond with the search results in JSON format
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
  
      // Respond with the search results in JSON format
      res.json(movies );
    });
  };

module.exports = {
    searchFilmsByGenre, searchFilmsByActor, searchFilmsByTitle, searchFilmsByYearRange, searchFilmsByGenreAndYearRange, searchNewestFilm,
};
