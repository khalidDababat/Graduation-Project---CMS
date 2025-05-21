const db = require('../config/db');

exports.createUser = async (userData) => {
    const { full_name, ID_number, phone, email, admin_id } = userData;
    const sql = `INSERT INTO users (full_name, ID_number, phone, email, admin_id) VALUES (?, ?, ?, ?, ?)`;
    const [results] =  await db.query(sql, [full_name, ID_number, phone, email, admin_id]);
    return results;
};
