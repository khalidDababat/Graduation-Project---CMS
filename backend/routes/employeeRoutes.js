const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//fetch all employee
router.get('/', employeeController.getEmployees);

//added employee
router.post('/', employeeController.addEmployee);

//update employee
router.put('/:id', employeeController.updateEmployee);

//delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
