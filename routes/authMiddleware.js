// // authMiddleware.js - Middleware to verify authentication token

// const jwt = require('jsonwebtoken');
// const jwtSecret = 'yoongi';

// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }

//     req.user = user;
//     next();
//   });
// }

// module.exports = authenticateToken;
// authMiddleware.js - Middleware to verify authentication token

const jwt = require('jsonwebtoken');
const jwtSecret = 'yoongi';

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  //const token = authHeader;

  const token = authHeader.split(' ')[1]; // Extract the token without "Bearer"
  console.log('Token:', token); // Log the token value

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log('User info:', user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
