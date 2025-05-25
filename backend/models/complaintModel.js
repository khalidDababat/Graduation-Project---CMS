
const db = require('../config/db');

exports.createComplaint = async (complaintData) => {
    const { user_id, title, description, department_id, status, image_path, admin_id, Note } = complaintData;
    const sql = `INSERT INTO complaints (user_id, title, description, department_id, created_at, status, image_path, admin_id, Note)
                        VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)`;
    await db.query(sql, [user_id, title, description, department_id, status, image_path, admin_id, Note]);
};


// Get complaints by date range
exports.getComplaintsByDate = async (startDate, endDate) => {

const sql = `
    SELECT c.id, c.title,c.description ,c.status, c.created_at, d.name AS department_name, e.FullName AS employee_name 
    FROM complaints c
    LEFT JOIN departments d ON c.department_id = d.id
    LEFT JOIN Complaint_Assignment ca ON ca.complaint_id = c.id
    LEFT JOIN employees e ON ca.employee_id = e.id
    WHERE c.created_at BETWEEN ? AND ?
    `;
// ,[startDate + ' 00:00:00', endDate + ' 23:59:59']
    const [rows] = await db.query(sql, [startDate, endDate]);
    return rows;
};


exports.filterComplaints = async (startDate, endDate) => {
    const sql = `
     SELECT id,title,description,status,image_path,Note,created_at
     FROM complaints
     WHERE created_at BETWEEN ? AND ?
    `;
    const [rows] = await db.query(sql, [startDate, endDate]);
    return rows;
}

exports.getComplaintsInfo = async () => {
  const [rows] = await db.query(`SELECT * FROM complaints`);
    return rows;
};
exports.getComplaintDetails = async (complaintId) => {
    const sql = `
      SELECT 
        c.id AS complaint_id,
        c.title,
        u.phone,
        c.description,
        c.status,
        c.created_at,
        c.image_path,
        c.Note,
        d.name AS department_name
      FROM complaints c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN departments d ON c.department_id = d.id
      WHERE c.id = ?
    `;
    const [results] = await db.query(sql, [complaintId]);
    return results;
}

exports.deletedComplaint = async (complaint_id) => {
    
    const sqlUpdate = `UPDATE complaints SET is_deleted_by_admin = true WHERE id = ?`;
    // const sqlDelete = `DELETE FROM complaints WHERE id = ?`;

    await db.query(sqlUpdate,[complaint_id]);
    
    };

exports.updateComplaintByAdmin = async (complaintId, updateData) => {
    const { status, department_id, note, employee_id } = updateData;
    const sql = `
    UPDATE complaints 
    SET status = ?, department_id = ?, Note = ?, employee_id = ?
    WHERE id = ?
    `;
    await db.query(sql, [status, department_id, note, employee_id, complaintId]);
};


//  Change complaint status (by employee)
exports.updateStatus = async (complaint_id, status) => {

    const sql = `UPDATE Complaints SET status = ? WHERE id = ?`;
    const [result] =  await db.query(sql,[status,complaint_id])
    
//  console.log('Update Result:', result);
   return result;

};


exports.assignComplaint = async ({ complaint_id, employee_id, admin_id, note }) => {

    const [existing] = await db.query(
    'SELECT * FROM Complaint_Assignment WHERE complaint_id = ? AND employee_id = ?',
    [complaint_id, employee_id]
    );
    if (existing.length > 0) throw new Error('Complaint already assigned to this employee.');

// update status complaint
    await db.query(
    'UPDATE complaints SET status = ?, note = ? WHERE id = ?',
    ['assign', note, complaint_id]
    );

    await db.query(
    'INSERT INTO Complaint_Assignment (complaint_id, employee_id, assigned_by_admin_id, assigned_at) VALUES (?, ?, ?, ?)',
    [complaint_id, employee_id, admin_id, new Date()]
    );

  // سجل الحركة (صادرة من الإدمن - واردة للموظف)
    await db.query(
    `INSERT INTO complaint_transfer_log (complaint_id, from_user_type, from_user_id, to_user_type, to_user_id, transfer_type, note) VALUES (?, 'admin', ?, 'employee', ?, 'assigned', ?)`,
    [complaint_id, admin_id, employee_id, note]
  );
};

exports.returnComplaint = async ({ complaint_id, employee_id, note }) => {

        const [existing] = await db.query(
        `SELECT * FROM Complaint_Transfer_Log 
        WHERE complaint_id = ? AND from_user_type = 'employee' 
        AND from_user_id = ? AND transfer_type = 'returned'`,
    [complaint_id, employee_id]
);

  if (existing.length > 0) {
    throw new Error('Complaint already returned by this employee.');
  }

    // update status
    await db.query(
    'UPDATE complaints SET status = ? WHERE id = ?',
    ['return', complaint_id]
    );

  // سجل الحركة (صادرة من الموظف - واردة للإدمن)
    await db.query(
    `INSERT INTO complaint_transfer_log (complaint_id, from_user_type, from_user_id, to_user_type, to_user_id, transfer_type, note) VALUES (?, 'employee', ?, 'admin', NULL, 'returned', ?)`,
    [complaint_id, employee_id, note]
    );
};

exports.getIncomingComplaints = async (type, user_id) => {
    return await db.query(
    `SELECT * FROM complaint_transfer_log WHERE to_user_type = ? AND to_user_id = ? ORDER BY created_at DESC`,
    [type, user_id]
    );
};

exports.getOutgoingComplaints = async (type, user_id) => {
    return await db.query(
    `SELECT * FROM complaint_transfer_log WHERE from_user_type = ? AND from_user_id = ? ORDER BY created_at DESC`,
    [type, user_id]
    );
};


