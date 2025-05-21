
const db = require('../config/db');

exports.createComplaint = async (complaintData) => {
    const { user_id, title, description, department_id, status, image_path, admin_id, Note } = complaintData;
    const sql = `INSERT INTO complaints (user_id, title, description, department_id, created_at, status, image_path, assigned_employee_id, admin_id, Note)
                        VALUES (?, ?, ?, ?, NOW(), ?, ?, NULL, ?, ?)`;
    await db.query(sql, [user_id, title, description, department_id, status, image_path, admin_id, Note]);
};
