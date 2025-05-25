const db = require('../config/db');
const { hashPassword } = require('../services/hashService');
const bcrypt = require('bcrypt');


//added new employee
async function addEmployee(employee) {
  const { fullName, phone, idNumber, password, email, admin_ID, department_id } = employee;

  const result = await db.query(
    'INSERT INTO employees (FullName, phone, ID_Number, password, email, admin_ID, department_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [fullName, phone, idNumber, password, email, admin_ID, department_id]
  );

  // console.log("Result of insert:", result);
  
  return result;
}

//fetch all employee with depatment name
async function getAllEmployeesWithDepartment() {
  const [rows] = await db.query(`
    SELECT e.*, d.name AS department_Name
    FROM employees e
    JOIN departments d ON e.department_id = d.id
  `);
  return rows;
}

// update employee
async function updateEmployee(id, employee) {
  const { fullName, phone, idNumber, password, email, department_id } = employee;

//  let hashedPassword = null;
//     if (password) {
//     // const saltRounds = 10;
//     // hashedPassword = await bcrypt.hash(password, saltRounds);
//     const hashedPassword = await hashPassword(password);
//   }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [result] = await db.query(
    'UPDATE employees SET FullName = ?, phone = ?, ID_Number = ?, password = ?, email = ?, department_id = ? WHERE id = ?',
    [fullName, phone, idNumber, hashedPassword, email, department_id, id]
  );
  return result;
}


//delete employee
async function deleteEmployee(id) {
  const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);
  return result;
}

getAllEmployees = async () => {
  const [rows] = await db.query(`SELECT * FROM employees`);
  return rows;
};

getEmployeesById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM employees  WHERE id = ?`,[id]);
  return rows;
  
};

module.exports = {
  addEmployee,
  getAllEmployeesWithDepartment,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeesById
};
