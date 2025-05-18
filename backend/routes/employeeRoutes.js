const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/add', employeeController.addEmployee);         // add employee
router.get('/', employeeController.getEmployees);            // view employee
router.put('/update/:id', employeeController.updateEmployee); //update

module.exports = router;
