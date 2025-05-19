const db = require('../config/db');

const findAdminByEmail = (email, callback) => {
  const sql = 'SELECT * FROM admin WHERE email = ?';
  db.query(sql, [email], callback);
};

const updateAdminPassword = (email, hashedPassword, callback) => {
  const sql = 'UPDATE admin SET password = ? WHERE email = ?';
  db.query(sql, [hashedPassword, email], callback);
};

module.exports = {
  findAdminByEmail,
  updateAdminPassword
};
