const bcrypt = require('bcrypt');
const {
  findAdminByUsername,
  findEmployeeByNationalId,
} = require('../models/authModel');

const login = (req, res) => {
  const { role } = req.body;

  if (!role) return res.status(400).json({ message: 'Role is required.' });

  if (role === 'admin') {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required for admin.' });

    findAdminByUsername(username, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.length === 0)
        return res.status(401).json({ message: 'Invalid admin credentials.' });

      const admin = results[0];
      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error comparing passwords' });
        if (!isMatch)
          return res.status(401).json({ message: 'Invalid admin credentials.' });

        res.status(200).json({
          message: 'Admin login successful',
          role: 'admin',
          id: admin.id,
          username: admin.username,
        });
      });
    });

  } else if (role === 'employee') {
    const { national_id, password } = req.body;
    if (!national_id || !password)
      return res.status(400).json({ message: 'National ID and password are required for employee.' });

    findEmployeeByNationalId(national_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });

      if (results.length === 0)
        return res.status(401).json({ message: 'Employee not found.' });

      const employee = results[0];

      bcrypt.compare(password, employee.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error comparing passwords' });
        if (!isMatch)
          return res.status(401).json({ message: 'Invalid employee credentials.' });

        res.status(200).json({
          message: 'Employee login successful',
          role: 'employee',
          id: employee.id,
          name: employee.name,
          department_id: employee.department_id,
        });
      });
    });
  } else {
    return res.status(400).json({ message: 'Invalid role provided.' });
  }
};

module.exports = {
  login,
};
