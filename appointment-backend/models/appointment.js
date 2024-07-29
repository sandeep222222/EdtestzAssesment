const connection = require('../config/db');

const Appointment = {
  create: (date, userId) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO appointments (date, user_id) VALUES (?, ?)';
      connection.query(query, [date, userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  findAllByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM appointments WHERE user_id = ?';
      connection.query(query, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Appointment;