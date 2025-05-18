const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');

// added employee
exports.addEmployee = async (req, res) => {
    try {
        const { FullName, phone, ID_Number, password, email, admin_ID, department_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        Employee.createEmployee({ FullName, phone, ID_Number, password: hashedPassword, email, admin_ID, department_id }, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: 'Employee added successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// view employee
exports.getEmployees = (req, res) => {
    Employee.getAllEmployees((err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
};

// update employees
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { FullName, phone, ID_Number, password, email, department_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        Employee.updateEmployee(id, { FullName, phone, ID_Number, password: hashedPassword, email, department_id }, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json({ message: 'Employee updated successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
