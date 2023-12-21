const bcrypt = require('bcrypt');

const plainTextPassword = ''; 

bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error('Error generating salt:', err);
    return;
  }

  bcrypt.hash(plainTextPassword, salt, (hashErr, hash) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return;
    }

    console.log('Hashed Password:', hash);
  });
});
