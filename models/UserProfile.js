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
        SELECT
    user.userName,
    user.avatar,
    user.bio,
    user.date_of_birth,
    user.displayName,
    user.email,
    user.gender,
    user.password,
    COUNT(DISTINCT log.idLog) AS films,
    COUNT(DISTINCT list.idList) AS lists
FROM user
LEFT JOIN log ON user.userName = log.user_userName
LEFT JOIN list ON user.userName = list.userName
WHERE user.userName = ?
GROUP BY user.userName, user.avatar, user.bio, user.date_of_birth, user.displayName, user.email, user.gender, user.password;
`;

        console.log('Executing SQL query:', SQLquery, 'with userName:', userName);
        connection().query(SQLquery, [userName], callback);
    },
    
};

module.exports = UserProfile;
