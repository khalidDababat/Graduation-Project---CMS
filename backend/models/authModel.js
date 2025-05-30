const db = require('../config/db'); 

const findAdminByUsername = async (username) => {
  const query = 'SELECT * FROM admins WHERE BINARY username = ?';
  const [results] = await db.query(query, [username]);
  return results;
};

const findEmployeeByIDNumber = async (ID_Number) => {
  const query = 'SELECT * FROM employees WHERE ID_Number = ?';
  const [results] = await db.query(query, [ID_Number]);
  return results;
};

const findUserByEmail = async (email, role) => {
  const table = role === 'admin' ? 'admins' : 'employees';
  const query = `SELECT * FROM ${table} WHERE email = ?`;
  const [results] = await db.query(query, [email]);
  return results;
};

const storeLoginToken = async (email, role, token, expiresAt,user_Id) => {
  const query = `INSERT INTO login_tokens (email, role, token, expires_at) VALUES (?, ?, ?, ?)`;
  await db.query(query, [email, role, token, expiresAt]);
};

const verifyLoginToken = async (token) => {
  const query = `SELECT * FROM login_tokens WHERE token = ? AND expires_at > NOW()`;
  const [results] = await db.query(query, [token]);
  return results;
};

const deleteLoginToken = async (token) => {
  const query = `DELETE FROM login_tokens WHERE token = ?`;
  await db.query(query, [token]);
};
const updateUserPassword = async (userId, hashedPassword, role) => {
  const table = role === 'admin' ? 'admins' : 'employees';
  const query = `UPDATE ${table} SET password = ? WHERE id = ?`;
  await db.query(query, [hashedPassword, userId]);
  // console.log('Updating password for', userId, 'with role', role, 'to:', hashedPassword);

};
module.exports = {
  findAdminByUsername,
  findEmployeeByIDNumber,
  findUserByEmail,
  storeLoginToken,
  verifyLoginToken,
  deleteLoginToken,
  updateUserPassword,

};
