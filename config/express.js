const express = require('express');
const path = require('path');
const app = express();

// Cấu hình middleware và đường dẫn tĩnh
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.json());
module.exports = app;
