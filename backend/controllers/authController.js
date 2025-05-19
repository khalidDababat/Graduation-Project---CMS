const bcrypt = require('bcrypt');
const {
  findAdminByUsername,
  findEmployeeByIDNumber,
} = require('../models/authModel');

const login = async (req, res) => {
  const { role } = req.body;

  if (!role) return res.status(400).json({ message: 'Role is required.' });

  try {
    if (role === 'admin') {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ message: 'Username and password are required for admin.' });

      const results = await findAdminByUsername(username);
      if (results.length === 0)
        return res.status(401).json({ message: 'Invalid admin credentials.' });

      const admin = results[0];

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid admin credentials.' });

      return res.status(200).json({
        message: 'Admin login successful',
        role: 'admin',
        id: admin.id,
        username: admin.username,
      });

    } else if (role === 'employee') {
      const { ID_Number, password } = req.body;
      if (!ID_Number || !password)
        return res.status(400).json({ message: 'National ID and password are required for employee.' });

      const results = await findEmployeeByIDNumber(ID_Number);
      if (results.length === 0)
        return res.status(401).json({ message: 'Employee not found.' });

      const employee = results[0];

      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid employee credentials.' });

      return res.status(200).json({
        message: 'Employee login successful',
        role: 'employee',
        id: employee.id,
        name: employee.name,
        department_id: employee.department_id,
      });

    } else {
      return res.status(400).json({ message: 'Invalid role provided.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Database error', error: error.message });
  }
};

module.exports = {
  login,
};
