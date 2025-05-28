const db = require('../config/db');
const bcrypt = require('bcrypt');

const findAdminById = async (id) => {
  const [results] = await db.query('SELECT * FROM admins WHERE id = ?', [id]);
  return results[0];
};


const updateAdminInfo = async (id, username, email) => {
  const query = 'UPDATE admins SET BINARY username = ?, email = ? WHERE id = ?';
  await db.query(query, [username, email, id]);
};

const updateAdminPassword = async (id, hashedPassword) => {
  const query = 'UPDATE admins SET password = ? WHERE id = ?';
  await db.query(query, [hashedPassword, id]);
};

module.exports = {
  findAdminById,
  updateAdminInfo,
  updateAdminPassword,
};
