const UserProfile = require('../models/UserProfile');

const getUserRecentlyWatchedMovies = (req, res) => {
    console.log('User info:', req.user); 
    const userName = req.user.userName; 
    console.log('userName:', userName); 
    UserProfile.getUserRecentlyWatchedMovies(userName, (err, recentlyWatchedMovies) => {
        if (err) {
            console.error('Error getting recently watched movies: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(recentlyWatchedMovies);
    });
};

const getUserRecentReviews = (req, res) => {
    console.log('User info:', req.user); 
    const userName = req.user.userName; 
    console.log('userName:', userName); 
    UserProfile.getUserRecentReviews(userName, (err, recentReviews) => {
        if (err) {
            console.error('Error getting recent reviews: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(recentReviews);
    });
};
const getUserInformation = (req, res) => {
    console.log('User info:', req.user); 
    const userName = req.user.userName; 
    console.log('userName:', userName); 

    UserProfile.getUserInformation(userName, (err, userInformation) => {
        if (err) {
            console.error('Error getting user information: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(userInformation);
    });
};

module.exports = {
    getUserRecentlyWatchedMovies,
    getUserRecentReviews,
    getUserInformation,
};
