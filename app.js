
const expressApp = require('./config/express');
const connectDB = require('./config/database');
const filmsRoutes = require('./routes/filmsRoutes');
const DetailsFilmsRoutes = require('./routes/filmDetailsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userListRoutes');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');

expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');
expressApp.use(cors());

// Kết nối cơ sở dữ liệu
connectDB();
// Sử dụng tuyến đường phim
expressApp.use('/', filmsRoutes);
expressApp.use('/', DetailsFilmsRoutes);
expressApp.use('/', searchRoutes);
expressApp.use('/', userRoutes);

expressApp.use(bodyParser.json());

expressApp.use('/', authRoutes);


expressApp.get('/', (req, res) => {
    res.render('index');
});
expressApp.get('/movie-list', (req, res) => {
    res.render('user-movie-list');
});

// Add the route for film details
expressApp.get('/film/:id', (req, res) => {
    res.render('filmDetail');
});
// Khởi chạy server
const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
