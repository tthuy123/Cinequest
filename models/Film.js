
const connection = require('../config/database');
const Film = {
    getAllFilms: (offset, limit, callback) => {
        const query = `
        SELECT film.idfilm, film.title, film.year,film.poster, ROUND(AVG(reviews.rating),1) AS rating
                 FROM film LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
                 GROUP BY film.idfilm
         LIMIT ?, ?`;
        connection().query(query, [offset, limit], callback);
    },
    // get film detail 
    getFilmDetails: (idfilm,callback) => {
        const SQLquery = 
        `SELECT film.idfilm, film.title, film.year, film.runtime, film.sypnosis, film.backdrop, film.poster, (
            SELECT person.name
            FROM person
            INNER JOIN partakes ON partakes.person_idperson = person.idperson
            WHERE partakes.film_idfilm = film.idfilm AND partakes.person_role = 'Director'
            ) AS director,
            GROUP_CONCAT(DISTINCT stars.character_name) AS cast,
            GROUP_CONCAT(DISTINCT genre.name) AS genres,
            ROUND(AVG(reviews.rating),1) AS rating
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
              SELECT film.title, film.year, film.idfilm, film.backdrop, film.poster
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
        searchFilmsByYearRange: (fromYear,toYear, offset,limit, callback) => {
            const SQLquery = `
              SELECT film.idfilm, film.title, film.backdrop, film.poster, film.year
              FROM film
              WHERE film.year BETWEEN ? AND ?
              GROUP BY film.idfilm
              LIMIT ? 
              OFFSET ?`;
        
            connection().query(SQLquery, [fromYear, toYear,limit,offset], callback);
          },
        searchFilmsByGenreAndYearRange: (genre, fromYear, toYear, offset, limit, callback) => {
            const SQLquery = `
              SELECT film.idfilm, film.title, film.backdrop, film.poster, film.year
              FROM film
              LEFT JOIN isgenre ON isgenre.film_idfilm = film.idfilm
              LEFT JOIN genre ON genre.idGenre = isgenre.Genre_idGenre
              WHERE genre.name = ? AND film.year BETWEEN ? AND ?
              GROUP BY film.idfilm
              LIMIT ?
              OFFSET ?`;
        
            connection().query(SQLquery, [genre, fromYear, toYear, limit, offset], callback);
          },
        searchNewestFilm: (offset,limit,callback) => {
            const SQLquery = `
                SELECT film.idfilm, film.title, film.year, film.backdrop, film.poster
                FROM film
                ORDER BY film.year DESC
                LIMIT ?
                OFFSET ?`;
    
            connection().query(SQLquery, [limit,offset],callback);
        },
        searchMostRateFilm: (offset, limit, callback) => {
            const SQLquery = `
                SELECT film.idfilm, film.title, film.year, film.backdrop, film.poster, ROUND(AVG(reviews.rating), 1) as rating
                FROM film
                INNER JOIN reviews ON film.idfilm = reviews.film_idfilm
                GROUP BY film.idfilm
                ORDER BY rating DESC
                LIMIT ?
                OFFSET ?`;
        
            connection().query(SQLquery, [limit, offset], callback);
        },
        searchPopularFilm: (offset, limit, callback) => {
            const SQLquery = `
                SELECT film.idfilm, film.title, film.year, film.backdrop, film.poster, COUNT(log.idLog) as Logcount
                FROM film
                INNER JOIN log ON film.idfilm = log.film_idfilm
                GROUP BY film.idfilm
                ORDER BY Logcount DESC
                LIMIT ?
                OFFSET ?`;
        
            connection().query(SQLquery, [limit, offset], callback);
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
