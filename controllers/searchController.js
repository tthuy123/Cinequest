// searchController.js
const Film = require('../models/Film');

const searchFilmsByGenre = (req, res) => {
    const { genre } = req.query;

    // Call a function in your model or database layer to perform the search
    Film.searchFilmsByGenre(genre, (err, movies) => {
        if (err) {
            console.error('Error searching movies by genre: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Respond with the search results in JSON format
        res.json({ movies });
    });
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

module.exports = {
    searchFilmsByGenre, searchFilmsByActor
};
