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
        res.json({ movies });
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
      res.json({ movies });
    });
  };

module.exports = {
    searchFilmsByGenre, searchFilmsByActor, searchFilmsByTitle
};
