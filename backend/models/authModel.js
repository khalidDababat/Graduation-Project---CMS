const db = require('../config/db'); // ملف الاتصال بقاعدة البيانات

const findAdminByUsername = async (username) => {
  const query = 'SELECT * FROM admins WHERE username = ?';
  const [results] = await db.query(query, [username]);
  return results;
};

const findEmployeeByIDNumber = async (ID_Number) => {
  const query = 'SELECT * FROM employees WHERE ID_Number = ?';
  const [results] = await db.query(query, [ID_Number]);
  return results;
};

module.exports = {
  findAdminByUsername,
  findEmployeeByIDNumber,
};
