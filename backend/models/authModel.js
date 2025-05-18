const db = require('../config/db');

const findAdminByUsername = (username, callback) => {
  const query = 'SELECT * FROM admins WHERE username = ?';
  db.query(query, [username], callback);
};

const findEmployeeByIDNumber = (IDNumber, callback) => {
  const query = 'SELECT * FROM employees WHERE ID_Number = ?';
  db.query(query, [IDNumber], callback);
};

module.exports = {
  findAdminByUsername,
  findEmployeeByIDNumber,
};
