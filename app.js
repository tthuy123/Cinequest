const expressApp = require('./config/express');
const connectDB = require('./config/database');
const filmsRoutes = require('./routes/filmsRoutes');
const DetailsFilmsRoutes = require('./routes/filmDetailsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userListRoutes');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

// Kết nối cơ sở dữ liệu
connectDB();
// Sử dụng tuyến đường phim
expressApp.use('/api', filmsRoutes);
expressApp.use('/api', DetailsFilmsRoutes);
expressApp.use('/api', searchRoutes);
expressApp.use('/api', userRoutes);

expressApp.use(bodyParser.json());

expressApp.use('/auth', authRoutes);

// Khởi chạy server
const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
