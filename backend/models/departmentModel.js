const db = require('../config/db');

exports.getAllDepartments = async () => {
  const [rows] = await db.query(`SELECT * FROM departments`);
    return rows;
};

exports.getDepartmentById = async (id) => {
  const [rows] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
  return rows[0];
};
