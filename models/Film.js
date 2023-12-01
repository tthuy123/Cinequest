
const connection = require('../config/database');

const Film = {
    getAllFilms: (offset, limit, callback) => {
        const query = 'SELECT * FROM film LIMIT ?, ?';
        connection().query(query, [offset, limit], callback);
    },
    // get film detail 
    getFilmDetails: (idfilm,callback) => {
        const SQLquery = 
        `SELECT film.idfilm, film.title, film.year, film.runtime, film.sypnosis, film.backdrop, film.poster, (
            SELECT person.name
            FROM person
            INNER JOIN partakes ON partakes.person_idperson = person.idperson
            WHERE partakes.film_idfilm = film.idfilm AND partakes.person_role = 'director'
            ) AS director,
            GROUP_CONCAT(DISTINCT stars.character_name) AS cast,
            GROUP_CONCAT(DISTINCT genre.name) AS genres,
            AVG(reviews.rating) AS rating
            FROM film
            LEFT JOIN partakes ON partakes.film_idfilm = film.idfilm
            LEFT JOIN person ON person.idperson = partakes.person_idperson
            LEFT JOIN stars ON stars.film_idfilm = film.idfilm
            LEFT JOIN isgenre ON isgenre.film_idfilm = film.idfilm
            LEFT JOIN genre ON genre.idGenre = isgenre.Genre_idGenre
            LEFT JOIN reviews ON reviews.film_idfilm = film.idfilm
            WHERE film.idfilm = ?
            GROUP BY film.idfilm`;
            connection().query(SQLquery, [idfilm], callback);
        },
        // search film by genre
        searchFilmsByGenre: (genre, offset, limit, callback) => {
            const SQLquery = `
              SELECT film.title, film.year, film.idfilm
              FROM film
              LEFT JOIN isgenre ON isgenre.film_idfilm = film.idfilm
              LEFT JOIN genre ON genre.idGenre = isgenre.Genre_idGenre
              WHERE genre.name = ?
              GROUP BY film.idfilm
              LIMIT ?
      OFFSET ?`; // Add LIMIT clause for pagination
          
            connection().query(SQLquery, [genre, limit, offset], callback);
          },
          
        searchFilmsByActor: (actor, callback) => {
            const SQLquery = `
                SELECT film.idfilm, film.title, film.backdrop, film.poster
                FROM film
                LEFT JOIN stars ON stars.film_idfilm = film.idfilm
                WHERE stars.character_name = ?
                GROUP BY film.idfilm`;
    
            connection().query(SQLquery, [actor], callback);
        },
        addToWatched: (userName, filmId, callback) => {
            const SQLquery = `
                INSERT INTO log (user_userName, film_idfilm, dateWatched)
                VALUES (?, ?, now());`;
    
            connection().query(SQLquery, [userName, filmId], (err) => {
                if (err) {
                    callback(err, null);
                    return;
                }
    
                callback(null, { message: 'Film logged successfully' });
            });
        },
        addReview: (userName, filmId, rating, review, callback) => {
            const SQLquery = `
                INSERT INTO reviews (user_userName, film_idfilm, rating, comment,reviewTime)
                VALUES (?, ?, ?, ?,now());`;
    
            connection().query(SQLquery, [userName, filmId, rating, review], (err) => {
                if (err) {
                    callback(err, null);
                    return;
                }
    
                callback(null, { message: 'Review added successfully' });
            });
        },
        searchFilmsByTitle: (title, callback) => {
            const SQLquery = `
              SELECT film.idfilm, film.title, film.year, film.genre, film.backdrop, film.poster, film.rating
              FROM film
              WHERE film.title LIKE ?`;
          
            connection().query(SQLquery, [`%${title}%`], callback);
        }
       
};
module.exports = Film; 
