const db = require('../config/db');

// insert new employee
exports.createEmployee = (data, callback) => {
    const sql = `
        INSERT INTO employees (FullName, phone, ID_Number, password, email, admin_ID, department_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [data.FullName, data.phone, data.ID_Number, data.password, data.email, data.admin_ID, data.department_id], callback);
};

// fetch all employees
exports.getAllEmployees = (callback) => {
    db.query("SELECT * FROM employees", callback);
};

//update employee information
exports.updateEmployee = (id, data, callback) => {
    const sql = `
        UPDATE employees
        SET FullName = ?, phone = ?, ID_Number = ?, password = ?, email = ?, department_id = ?
        WHERE id = ?
    `;
    db.query(sql, [data.FullName, data.phone, data.ID_Number, data.password, data.email, data.department_id, id], callback);
};
