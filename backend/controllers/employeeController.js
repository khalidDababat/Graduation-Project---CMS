const employeeModel = require('../models/employeeModel');
const { hashPassword } = require('../services/hashService');


async function addEmployee(req, res) {
  try {
    const { fullName, phone, idNumber, password, email, admin_ID, department_id } = req.body;

    if (!password) 
        return res.status(400).json({ message: 'Password is required' });

    const hashedPassword = await hashPassword(password);
    const employee = { fullName, phone, idNumber, password: hashedPassword, email, admin_ID, department_id };

    await employeeModel.addEmployee(employee);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getEmployees(req, res) {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateEmployee(req, res) {
  try {
    const id = req.params.id;
    const { fullName, phone, idNumber,password, email, department_id } = req.body;
    
   
    await employeeModel.updateEmployee(id, { fullName, phone, idNumber,password, email, department_id });
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


async function deleteEmployee(req, res) {
  try {
    const id = req.params.id;
    await employeeModel.deleteEmployee(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
