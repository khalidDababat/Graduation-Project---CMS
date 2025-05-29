const bcrypt = require('bcrypt');
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
    const employees = await employeeModel.getAllEmployeesWithDepartment();
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

async function EmployeesById(req, res) {
   try{
    const id = req.params.id;
    const employee = await employeeModel.getEmployeesById(id);
    res.json(employee);

   }
   catch(err){
    res.status(500).json({ message: 'Server error' });
   }
  
}

const updateEmployeeSettings = async (req, res) => {

  // console.log('🔧 updateEmployeeSettings route called');
  try {
    const {  password, confirmPassword } = req.body;
    const role = req.user.role;
    const ID_Number = req.user.ID_Number;
    // console.log('Decoded JWT:', req.user);
   

     if (role !== 'employee') {
      return res.status(403).json({ message: 'Only employees can update their password.' });
    }

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Both password and confirmPassword are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await employeeModel.updateEmployeePasswordByIDNumber (ID_Number, hashedPassword);
    

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Error updating employee settings:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  EmployeesById,
  updateEmployeeSettings
};
