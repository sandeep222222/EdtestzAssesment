const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      connection.query(query, [username, hashedPassword], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ?';
      connection.query(query, [username], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
};

module.exports = User;