const mysql = require('mysql');

function connectDB() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'thuy130613',
        database: 'film',
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.stack);
            return;
        }
        console.log('Connected to MySQL database');
    });

    return connection;
}

module.exports = connectDB;


