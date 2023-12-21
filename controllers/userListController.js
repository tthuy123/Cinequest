const UserList = require('../models/UserList');

const getUserMovieLists = (req, res) => {
    console.log('User info:', req.user); 
    const userName = req.user.userName; 
    console.log('userName:', userName); 
    UserList.getUserMovieLists(userName, (err, movieLists) => {
        if (err) {
            console.error('Error getting user movie lists: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(movieLists);
    });
};
const getMovieList = (req, res) => {
    const listId = req.params.id;

    UserList.getMovieList(listId, (err, movieList) => {
        if (err) {
            console.error('Error getting movie list: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json({ movieList });
    });
};
const createList = (req, res) => {
    const userName = req.user.userName; 
    const title = req.body.title;

    UserList.createList(userName, title, (err, newList) => {
        if (err) {
            console.error('Error creating new list: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).json({ message: 'List created successfully', newList });


    });
};

const addFilmToList = (req, res) => {
    const listId = req.body.listId;
    const userName = req.user.userName;
    const filmId = req.body.filmId;

    UserList.addFilmToList(listId,userName,filmId, (err, newList) => {
        if (err) {
            console.error('Error adding film to list: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).json({ message: 'Film added successfully', newList });

    });
};

// delete film from list
// const deleteFilmFromList = (req, res) => {

module.exports = {
    getUserMovieLists, getMovieList, createList,addFilmToList
};
