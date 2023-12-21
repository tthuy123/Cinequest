
const expressApp = require('./config/express');
const connectDB = require('./config/database');
const filmsRoutes = require('./routes/filmsRoutes');
const DetailsFilmsRoutes = require('./routes/filmDetailsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userListRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');

expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');
expressApp.use(cors());

connectDB();
expressApp.use('/', filmsRoutes);
expressApp.use('/', DetailsFilmsRoutes);
expressApp.use('/', searchRoutes);
expressApp.use('/', userRoutes);
expressApp.use('/', userProfileRoutes);

expressApp.use(bodyParser.json());

expressApp.use('/', authRoutes);


expressApp.get('/', (req, res) => {
    res.render('index');
});
expressApp.get('/movie-list', (req, res) => {
    res.render('user-movie-list');
});
expressApp.get('/create-movie-list', (req, res) => {
    res.render('create-movie-list');
});
expressApp.get('/user-profile', (req, res) => {
    res.render('user-profile');
});

expressApp.get('/film/:id', (req, res) => {
    res.render('filmDetail');
});
expressApp.get('/show-movie-list/:id', (req, res) => {
    res.render('film-in-list');
});
expressApp.get('/search-by-title', (req, res) => {
    const title = req.query.title || '';
    res.render('search-title', { title });
});
expressApp.get('/search', (req, res) => {
    res.render('search-title');
});
expressApp.get('/user', (req, res) => {
    res.render('user-profile');
});
expressApp.get('/person', (req, res) => {
    res.render('person');
});
const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
