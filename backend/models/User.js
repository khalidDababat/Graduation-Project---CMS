const db = require('../config/db');

const findOrCreateUser = (data, callback) => {
  const checkSql = `SELECT id FROM users WHERE ID_number = ? AND phone = ?`;
  db.query(checkSql, [data.ID_number, data.phone], (err, results) => {
    
    if (err) return callback(err);
    
    if (results.length > 0) {
      callback(null, results[0].id);
    } else {
      const insertSql = `
        INSERT INTO users (full_name, ID_number, phone, email)
        VALUES (?, ?, ?, ?)
      `;
      const values = [
        data.full_name,
        data.phone,
        data.email,
        data.ID_number
      ];
      db.query(insertSql, values, (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
      });
    }
  });
};

module.exports = { findOrCreateUser };
