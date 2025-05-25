const db = require('../config/db');

exports.getAllDepartments = async () => {
  const [rows] = await db.query(`SELECT * FROM departments`);
    return rows;
};
