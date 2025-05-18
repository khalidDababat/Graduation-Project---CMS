const db = require('../config/db');

const createComplaint = (data, callback) => {
  const sql = `
    INSERT INTO complaints 
    (user_id, title, description, department_id, created_at,image_path) 
    VALUES (?, ?, ?, ?, ?,?)
  `;
  const values = [
    data.user_id,
    data.title,
    data.description,
    data.department_id,
    data.now(),
    data.image_path
  ];
  db.query(sql, values, callback);
};

module.exports = { createComplaint };
