const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { verifyToken } = require('../middleware/authMiddleware');

//fetch all employee
router.get('/', employeeController.getEmployees);

//added employee
router.post('/', employeeController.addEmployee);

// post/api/employee/update-settings
router.put('/update-settings', verifyToken, employeeController.updateEmployeeSettings);

//update employee
router.put('/:id', employeeController.updateEmployee);

//delete employee
router.delete('/:id', employeeController.deleteEmployee);

router.get('/:id', employeeController.EmployeesById);

module.exports = router;
