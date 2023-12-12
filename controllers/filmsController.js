// xu ly logic

const Film = require('../models/Film');

const filmsController = {
    getAllFilms: (req, res) => {
        const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    Film.getAllFilms(offset, limit, (err, films) => {
        if (err) {
            console.error('Error getting movies: ', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(films);
            
          // res.render('films/list', { film });

            // Tạo một đoạn HTML đơn giản để hiển thị danh sách phim
    // let htmlContent = '<h1>Films List</h1><ul>';
    // film.forEach(film => {
    //   htmlContent += `<li>${film.title}</li>`;
    // });
    // htmlContent += '</ul>';

    // // Trả về nội dung HTML trực tiếp
    // res.send(htmlContent);
           
        });
    },
    getFilmDetails: (req, res) => {
        const idfilm = req.params.id;
        Film.getFilmDetails(idfilm, (err, films) => {
            console.log(films);
            if (err) {
                console.error('Error getting movies: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            //res.json(films);
            if (films.length > 0) {
                const film = films[0];  // Access the first element of the array
            res.render('filmDetail', { film });
        } else {
            res.status(404).send('Film not found');
        } 
        //     if (films.length > 0) {
        //         const film = films[0];  // Access the first element of the array
        // } else {
        //     res.status(404).send('Film not found');
        // }
            // let htmlContent = '';
            // //res.render('film/detail', { film });
            // // Tạo một đoạn HTML đơn giản để hiển thị chi tiết phim 
            // if (films.length > 0) {
            //     const film = films[0];  // Access the first element of the array
    
            //     // Tạo một đoạn HTML đơn giản để hiển thị chi tiết phim 
            //     htmlContent += '<h1>Movie Details</h1>';
            //     htmlContent += `<h2>${film.title}</h2>`;
            //     htmlContent += `<ul>
            //       <li>Year: ${film.year}</li>
            //       <li>Runtime: ${film.runtime}</li>
            //       <li>Director: ${film.director}</li>
            //       <li>Cast: ${film.cast}</li>
            //       <li>Genres: ${film.genres}</li>
            //       <li>Rating: ${film.rating}</li>
            //         <li>Sypnosis: ${film.sypnosis}</li>
            //          </ul>`;
            //     // Trả về nội dung HTML trực tiếp
            //     res.send(htmlContent);

            // } else {
            //     res.status(404).send('Film not found');
            // }
});
    },
    addToWatched: (req, res) => {
        const { userName, filmId } = req.body;

        Film.addToWatched(userName, filmId, (err, result) => {
            if (err) {
                console.error('Error adding film to watched list: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).json(result);
        });
    },
    addReview: (req, res) => {
        const { userName, filmId, rating, review } = req.body;

        Film.addReview(userName, filmId, rating, review, (err, result) => {
            if (err) {
                console.error('Error adding review: ', err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).json(result);
        });
    }
}

module.exports = filmsController;