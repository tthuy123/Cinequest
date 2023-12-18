// models/UserList.js

const connection = require('../config/database');

const UserList = {
    // ... other functions

    getUserMovieLists: (userName, callback) => {
        const SQLquery = `
        SELECT list.idlist, list.title, COUNT(film.idfilm) AS movie_count
FROM list
JOIN user ON list.userName = user.userName
LEFT JOIN addtolist ON list.idList = addtolist.List_idList
LEFT JOIN film ON addtolist.film_idfilm = film.idfilm
WHERE user.username = ?
GROUP BY list.idlist, list.title
ORDER BY list.idlist;`;
        console.log('Executing SQL query:', SQLquery, 'with userName:', userName);
        connection().query(SQLquery, [userName], callback);
    },
    // chi tiet list film cua 1 list
    getMovieList: (listId, callback) => {
        const SQLquery = `
        SELECT film.idfilm, film.title, film.poster, list.title as ListTitle
        FROM film
        JOIN addtolist ON film.idfilm = addtolist.film_idfilm
        JOIN list ON addtolist.List_idList = list.idList
        WHERE list.idList = ?
        ORDER BY film.idfilm;`;

        connection().query(SQLquery, [listId], callback);
    },
    //create list
    createList: (userName, title, callback) => {
        const SQLquery = `
        INSERT INTO list (userName, title, dateModifier, dateCreated)
        VALUES (?,?,current_timestamp(5),now());`;

        connection().query(SQLquery, [userName, title], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            const fetchQuery = `
            SELECT * FROM list WHERE idlist = ?;
        `;

        connection().query(fetchQuery, [result.insertId], (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }

            // Extract the details and return them in the callback
            const newList = {
                id: rows[0].idList,
                name: rows[0].title,
                user: rows[0].userName,
            };

            callback(null, newList);
        });
        
    });
    },
    // add film to list
    addFilmToList: (listId,userName, filmId, callback) => {
        const SQLquery = `
        INSERT INTO addlist (List_idList,user_userName, film_idfilm, dateAdd)
        VALUES (?,?,?,now());`;

        connection().query(SQLquery, [listId, userName, filmId], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
    
            // Fetch the updated list of films after adding a new film
            const fetchQuery = `
                SELECT list.title as ListTitle, film.title, film.poster
                FROM film
                JOIN addlist ON film.idfilm = addlist.film_idfilm
                JOIN list ON addlist.List_idList = list.idList
                WHERE list.idList = ?   
                ORDER BY film.idfilm;`;
    
            connection().query(fetchQuery, [listId], (err, films) => {
                if (err) {
                    callback(err, null);
                    return;
                }
    
                // Extract the details and return them in the callback
                const newList = {
                    name: result.ListTitle, // Assuming title is a column in the list table
                    user: userName,
                    films: films, // Include the list of films in the newList object
                };
    
                callback(null, newList);
            });
    });
},
    // delete film from list
    // deleteFilmFromList: (listId, filmId, callback) => {
    //     const SQLquery = `
    //     DELETE FROM addlist WHERE List_idList = ? AND film_idfilm = ?;`;

    //     connection().query(SQLquery, [listId, filmId], callback);
    // },
};

module.exports = UserList;
