const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');
const jwtSecret = 'yoongi';

router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  const query = 'SELECT * FROM user WHERE userName = ?';
  connection().query(query, [userName], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (bcryptErr, match) => {
        if (bcryptErr) {
          console.error('Password comparison error:', bcryptErr);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }

        if (match) {
          // Passwords match, generate JWT with userName in the payload
          const token = jwt.sign({ userName: user.userName, userId: user.id }, jwtSecret, { expiresIn: '1h' });
          res.status(200).json({ message: 'Đăng nhập thành công', user, token });
        } else {
          // Passwords don't match, authentication failed
          res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
        }
      });
    } else {
      // User not found, authentication failed
      res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    }
  });
});

module.exports = router;
