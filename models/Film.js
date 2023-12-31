
const connection = require('../config/database');
const Film = {
    getAllFilms: (offset, limit, callback) => {
        const query = `
        SELECT film.idfilm, film.title, film.year,film.poster, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
                 FROM film LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
                 GROUP BY film.idfilm
         LIMIT ?, ?`;
        connection().query(query, [offset, limit], callback);
    },
    // get film detail 
    getFilmDetails: (idfilm,callback) => {
        const SQLquery = 
        `              
        SELECT
                film.idfilm,
                film.title,
                film.year,
                film.runtime,
                film.sypnosis,
                film.backdrop,
                film.poster,
                (
                    SELECT person.name
                    FROM person
                    INNER JOIN partakes ON partakes.person_idperson = person.idperson
                    WHERE partakes.film_idfilm = film.idfilm AND partakes.person_role = 'Director'
                    LIMIT 1
                ) AS director,
                GROUP_CONCAT(DISTINCT CONCAT(realName, ' as ', stars.character_name)) AS cast,
                GROUP_CONCAT(DISTINCT genre.name) AS genres,
                IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating,
                GROUP_CONCAT(DISTINCT CONCAT(crewName, ' as ', partakes.person_role)) AS crew,
                GROUP_CONCAT(DISTINCT studio.name) AS studio
            FROM
                film
            LEFT JOIN (
                SELECT
                    stars.film_idfilm,
                    stars.character_name,
                    person.name AS realName
                FROM
                    stars
                LEFT JOIN person ON person.idperson = stars.person_idperson
            ) AS stars ON stars.film_idfilm = film.idfilm
            LEFT JOIN (
                 SELECT 
                      partakes.person_role,
                      partakes.film_idfilm,
                      person.name as crewName
                FROM 
                    partakes
                LEFT JOIN person ON person.idperson = partakes.person_idperson
            ) AS partakes ON partakes.film_idfilm = film.idfilm
            LEFT JOIN isgenre ON isgenre.film_idfilm = film.idfilm
            LEFT JOIN genre ON genre.idGenre = isgenre.Genre_idGenre
            LEFT JOIN reviews ON reviews.film_idfilm = film.idfilm
            LEFT JOIN manages ON manages.film_idfilm = film.idfilm
            LEFT JOIN studio ON studio.idstudio = manages.studio_idstudio
            WHERE
                film.idfilm = ?
            GROUP BY
                film.idfilm;
    `;
            connection().query(SQLquery, [idfilm], callback);
        },
        // search film by genre
        searchFilmsByGenre: (genre, offset, limit, callback) => {
            const SQLquery = `
              SELECT film.title, film.year, film.idfilm, film.backdrop, film.poster, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
              FROM film
              LEFT JOIN isgenre ON isgenre.film_idfilm = film.idfilm
              LEFT JOIN genre ON genre.idGenre = isgenre.Genre_idGenre
              LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
              WHERE genre.name = ?
              GROUP BY film.idfilm
              LIMIT ?
      OFFSET ?`; // Add LIMIT clause for pagination
          
            connection().query(SQLquery, [genre, limit, offset], callback);
          },
          
        searchFilmsByActor: (actor, callback) => {
            const SQLquery = `
            SELECT film.idfilm, film.title, film.backdrop, film.poster, film.year, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating,
               person.name AS actorName, person.portrait, person.biography
                FROM film
                LEFT JOIN stars ON stars.film_idfilm = film.idfilm
                LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
                LEFT JOIN person ON stars.person_idperson = person.idperson
                WHERE person.name = ?
                GROUP BY person.name, film.idfilm, person.portrait, person.biography`;
                 
            connection().query(SQLquery, [actor], callback);
        },
        searchFilmsByYearRange: (fromYear,toYear, offset,limit, callback) => {
            const SQLquery = `
              SELECT film.idfilm, film.title, film.backdrop, film.poster, film.year, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
              FROM film 
                LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
              WHERE film.year BETWEEN ? AND ?
              GROUP BY film.idfilm
              LIMIT ? 
              OFFSET ?`;
        
            connection().query(SQLquery, [fromYear, toYear,limit,offset], callback);
          },
        searchFilmsByGenreAndYearRange: (genre, fromYear, toYear, offset, limit, callback) => {
            const SQLquery = `
              SELECT film.idfilm, film.title, film.backdrop, film.poster, film.year, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
              FROM film
              LEFT JOIN isgenre ON isgenre.film_idfilm = film.idfilm
              LEFT JOIN genre ON genre.idGenre = isgenre.Genre_idGenre
                LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
              WHERE genre.name = ? AND film.year BETWEEN ? AND ?
              GROUP BY film.idfilm
              LIMIT ?
              OFFSET ?`;
        
            connection().query(SQLquery, [genre, fromYear, toYear, limit, offset], callback);
          },
        searchNewestFilm: (offset,limit,callback) => {
            const SQLquery = `
                SELECT film.idfilm, film.title, film.year, film.backdrop, film.poster, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
                FROM film
                LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
                GROUP BY film.idfilm
                ORDER BY film.year DESC
                LIMIT ?
                OFFSET ?`;
    
            connection().query(SQLquery, [limit,offset],callback);
        },
        searchMostRateFilm: (offset, limit, callback) => {
            const SQLquery = `
                SELECT film.idfilm, film.title, film.year, film.backdrop, film.poster, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
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
                SELECT film.idfilm, film.title, film.year, film.backdrop, film.poster, COUNT(log.idLog) as Logcount, IFNULL(ROUND(AVG(reviews.rating), 1), 'N/A') AS rating
                FROM film
                INNER JOIN log ON film.idfilm = log.film_idfilm
                LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
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
            SELECT film.idfilm, film.title, film.year,film.poster, ROUND(AVG(reviews.rating),1) AS rating
            FROM film LEFT JOIN reviews ON film.idfilm = reviews.film_idfilm
            WHERE film.title LIKE ?
            GROUP BY film.idfilm
              `;
          
            connection().query(SQLquery, [`%${title}%`], callback);
        },
        showReviews: (idfilm,callback) => {
            const SQLquery = 
            `              
            SELECT reviews.rating, reviews.comment, DATE(reviews.reviewTime) as date, reviews.user_userName,
       user.avatar
FROM reviews
INNER JOIN user ON reviews.user_userName = user.userName
WHERE reviews.film_idfilm = ?
        `;
                connection().query(SQLquery, [idfilm], callback);
            },
       
};
module.exports = Film; 
