// authRoutes.js
const express = require('express');
const router = express.Router();
const users = require('../users');

router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  // Kiểm tra xem tài khoản có tồn tại và mật khẩu có khớp không
  const user = users.find(u => u.userName === userName && u.password === password);

  if (user) {
    // Đăng nhập thành công
    res.status(200).json({ message: 'Đăng nhập thành công', user });
  } else {
    // Đăng nhập thất bại
    res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
  }
});

module.exports = router;
