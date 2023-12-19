// models/UserProfile.js

const connection = require('../config/database');

const UserProfile = {
    // ... other functions

    // get user's recently watched movies
    getUserRecentlyWatchedMovies: (userName, callback) => {
        const SQLquery = `
        SELECT f.idfilm, f.title, f.year, f.poster
        FROM film f
        INNER JOIN log on idfilm = film_idfilm
        INNER JOIN user on username = user_username
        WHERE username = ?
        ORDER BY dateWatched desc;`;
        console.log('Executing SQL query:', SQLquery, 'with userName:', userName);
        connection().query(SQLquery, [userName], callback);
    },

    // get user's recent reviews
    getUserRecentReviews: (userName, callback) => {
        const SQLquery = `
        SELECT f.idfilm, f.title, f.year, f.poster, 
        r.reviewTime, r.rating, r.comment
        FROM film f
        INNER JOIN reviews r on idfilm = film_idfilm
        INNER JOIN user on username = user_username
        WHERE username = ?
        ORDER BY reviewTime desc;`;

        console.log('Executing SQL query:', SQLquery, 'with userName:', userName);
        connection().query(SQLquery, [userName], callback);
    },
    // get user information
    getUserInformation: (userName, callback) => {
        const SQLquery = `
        SELECT *
        FROM user
        WHERE userName = ?;`;

        console.log('Executing SQL query:', SQLquery, 'with userName:', userName);
        connection().query(SQLquery, [userName], callback);
    },
    
};

module.exports = UserProfile;
