const bcrypt = require('bcrypt');

const plainTextPassword = 'abc123'; // Replace with the actual password

// Generate a salt and hash the password
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error('Error generating salt:', err);
    // Handle the error appropriately
    return;
  }

  bcrypt.hash(plainTextPassword, salt, (hashErr, hash) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      // Handle the error appropriately
      return;
    }

    // Now 'hash' contains the hashed password, which you can store in the database
    console.log('Hashed Password:', hash);
  });
});
