const bcrypt = require('bcryptjs');

// The plain text password to compare
const password = 'Admin';

// The new hashed password stored in your database
const storedHash = '$2a$10$RTuwmvGHr3OvDtxeD8JynOGZ6me.bUnwzI90nkcD8hqRoBnF8ntHa';

// Compare the plain text password with the hashed password
bcrypt.compare(password, storedHash, (err, result) => {
    if (err) throw err;
    console.log('Password match:', result); // Should output: true
});
