// userController.js
const UserProfile = require('../models/UserProfile');

const getUserRecentlyWatchedMovies = (req, res) => {
    console.log('User info:', req.user); // Log user information
    const userName = req.user.userName; // Assuming you have user information stored in req.user after authentication
    console.log('userName:', userName); // Log the userName value
    UserProfile.getUserRecentlyWatchedMovies(userName, (err, recentlyWatchedMovies) => {
        if (err) {
            console.error('Error getting recently watched movies: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render or send the movie lists in the desired format (JSON or HTML)
        res.json(recentlyWatchedMovies);
    });
};

const getUserRecentReviews = (req, res) => {
    console.log('User info:', req.user); // Log user information
    const userName = req.user.userName; // Assuming you have user information stored in req.user after authentication
    console.log('userName:', userName); // Log the userName value

    UserProfile.getUserRecentReviews(userName, (err, recentReviews) => {
        if (err) {
            console.error('Error getting recent reviews: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render or send the reviews in the desired format (JSON or HTML)
        res.json(recentReviews);
    });
};

module.exports = {
    getUserRecentlyWatchedMovies,
    getUserRecentReviews,
    // Add other controller functions as needed
};
