
const db = require('../config/db');
const moment = require('moment-timezone');

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
        u.full_name,
        u.phone,
        u.ID_number,
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

  results.forEach(row => {
    row.created_at = moment(row.created_at).tz('Asia/Gaza').format('DD/MM/YYYY');
  });
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


//  Change complaint status 
exports.updateStatusWithNote = async (complaint_id, status,note) => {

    const sql = `UPDATE Complaints SET status = ?, Note = ? WHERE id = ?`;
    const [result] =  await db.query(sql,[status,note,complaint_id])
    
//  console.log('Update Result:', result);
   return result;

};

exports.updateStatus = async (complaint_id, status) => {

    const sql = `UPDATE Complaints SET status = ? WHERE id = ?`;
    const [result] =  await db.query(sql,[status,complaint_id])
    
//  console.log('Update Result:', result);
   return result;

};

exports.getComplaintsByStatus = async (status) => {

  return await db.query(
        `SELECT * 
        FROM  complaints
        WHERE status = ?`,
        [status]
    );

}

exports.getCountComplaintsByStatus = async (status) => {

  return await db.query(
        `SELECT COUNT(*) 
        FROM  complaints
        WHERE status = ?`,
        [status]
    );

}

exports.getCountComplaints= async () => {

  return await db.query(
        `SELECT COUNT(*) 
        FROM  complaints`
        
    );

}

exports.assignComplaint = async ({ complaint_id, employee_id, admin_id, note }) => {
  // تحقق إذا كانت الشكوى لا تزال مسندة لنفس الموظف ولم يتم إرجاعها بعد
  const [existing] = await db.query(
    `SELECT * FROM Complaint_Assignment 
    WHERE complaint_id = ? AND employee_id = ? AND is_active = TRUE`,
    [complaint_id, employee_id]
  );

  if (existing.length > 0) {
    throw new Error('Complaint is already assigned to this employee.');
  }

  await db.query(
    'UPDATE complaints SET status = ?, note = ?, admin_id = ? WHERE id = ?',
    ['assign', note, admin_id, complaint_id]
  );

  // تعيين الشكوى
  await db.query(
    `INSERT INTO Complaint_Assignment 
    (complaint_id, employee_id, assigned_by_admin_id, assigned_at, is_active)
    VALUES (?, ?, ?, ?, TRUE)`,
    [complaint_id, employee_id, admin_id, new Date()]
  );

  // سجل النقل
  await db.query(
    `INSERT INTO complaint_transfer_log 
    (complaint_id, from_user_type, from_user_id, to_user_type, to_user_id, transfer_type, note, created_at)
    VALUES (?, 'admin', ?, 'employee', ?, 'assigned', ?, ?)`,
    [complaint_id, admin_id, employee_id, note, new Date()]
  );
};



exports.returnComplaint = async ({ complaint_id, employee_id,admin_id, note }) => {
  // تحقق إذا تم إرجاعها سابقًا من نفس الموظف
  const [existing] = await db.query(
    `SELECT * FROM complaint_transfer_log 
     WHERE complaint_id = ? AND from_user_type = 'employee' 
     AND from_user_id = ? AND transfer_type = 'returned'`,
    [complaint_id, employee_id]
  );

  if (existing.length > 0) {
    throw new Error('Complaint already returned by this employee.');
  }

  await db.query(
    'UPDATE complaints SET status = ?  WHERE id = ?',
    ['return', complaint_id]
  );

  // جعل الإسناد غير مفعل
  await db.query(
    `UPDATE Complaint_Assignment 
     SET is_active = FALSE 
     WHERE complaint_id = ? AND employee_id = ?`,
    [complaint_id, employee_id]
  );

  // سجل النقل
  await db.query(
    `INSERT INTO complaint_transfer_log 
     (complaint_id, from_user_type, from_user_id, to_user_type, to_user_id, transfer_type, note, created_at)
     VALUES (?, 'employee', ?, 'admin', ?, 'returned', ?, ?)`,
    [complaint_id, employee_id,admin_id, note, new Date()]
  );
};



// Get Incoming Complaints
exports.getIncomingComplaints = async (type, user_id) => {
    return await db.query(
        `SELECT ctl.*, c.title, c.status,
        e.FullName AS to_employee_name,
        d.name AS to_department_name
         FROM complaint_transfer_log ctl
         JOIN complaints c ON ctl.complaint_id = c.id
         LEFT JOIN employees e ON ctl.to_user_type = 'employee' AND ctl.to_user_id = e.id
         LEFT JOIN departments d ON e.department_id = d.id
         WHERE ctl.to_user_type = ? AND ctl.to_user_id = ?
         ORDER BY ctl.created_at DESC`,
        [type, user_id]
    );
};

// Get Outgoing Complaints
exports.getOutgoingComplaints = async (type, user_id) => {
    return await db.query(
        `SELECT ctl.*, c.title, c.status
        FROM complaint_transfer_log ctl
        JOIN complaints c ON ctl.complaint_id = c.id
        WHERE ctl.from_user_type = ? AND ctl.from_user_id = ?
        ORDER BY ctl.created_at DESC`,
        [type, user_id]
    );
};

exports.getComplaintsByCitizenIDNumber =async (ID_Number) => {
  const query = `
    SELECT 
      users.full_name, users.ID_number, users.phone, users.email,
      complaints.id AS complaint_id, complaints.title, complaints.description, 
      complaints.department_id, complaints.status, complaints.image_path,
      complaints.created_at, complaints.Note
    FROM complaints
    INNER JOIN users ON complaints.user_id = users.id
    WHERE users.ID_number = ? AND complaints.is_deleted_by_admin = FALSE
    ORDER BY complaints.created_at DESC
  `;
  const [rows] = await db.query(query, [ID_Number]);
  // console.log("rows ",rows)
  return rows;
  

  
};

exports.getAssignedComplaints = async (employeeId) => {
  const [results] = await db.query(`
    SELECT 
      complaints.id AS complaint_id,
      complaints.title,
      complaints.description,
      complaints.status,
      complaints.image_path,
      complaints.Note,
      complaints.created_at,
      complaints.department_id,

      employees.id AS employee_id,
      employees.FullName AS employee_name,
      employees.phone,
      employees.ID_Number,
      employees.email,
      employees.department_id AS emp_department_id,

      complaint_assignment.assigned_at,
      admins.id

    FROM complaint_assignment
    JOIN complaints ON complaint_assignment.complaint_id = complaints.id
    JOIN employees ON complaint_assignment.employee_id = employees.id
    JOIN admins ON complaint_assignment.assigned_by_admin_id = admins.id
    WHERE employees.id = ?
      AND complaints.is_deleted_by_admin = 0
    ORDER BY complaints.created_at DESC
  `, [employeeId]);

  return results;
}

exports.getAssignedComplaintsByEmployee = async (employee_id) => {
  const [result] = await db.query(
    `SELECT c.id, c.title, c.description, c.status, c.image_path, c.note, c.created_at, d.name AS department_name
     FROM complaints c
     JOIN Complaint_Assignment ca ON c.id = ca.complaint_id
     JOIN departments d ON c.department_id = d.id
     WHERE ca.employee_id = ? AND ca.is_active = TRUE`,
    [employee_id]
  );
  return result;
};



