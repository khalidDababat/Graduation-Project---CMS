const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
  findAdminByUsername,
  findEmployeeByIDNumber,
  findUserByEmail,
  storeLoginToken,
  verifyLoginToken,
  deleteLoginToken,
} = require('../models/authModel');
const { sendEmail } = require('../services/mailService');


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

      const token = jwt.sign(
        { id: admin.id, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        message: 'Admin login successful',
        token,
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

      const token = jwt.sign(
        { 
          id: employee.id, 
          role: 'employee',
          ID_Number: employee.ID_Number, 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Employee login successful',
        token,
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

const verifyJWTToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, data: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};


const requestLogin = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email || !role)
      return res.status(400).json({ message: 'Email and role are required.' });

    const results = await findUserByEmail(email, role);
    if (results.length === 0)
      return res.status(404).json({ message: 'User not found.' });

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);// 10 min

    await storeLoginToken(email, role, token, expiresAt);

    const magicLink = `http://localhost:3000/magic-login?token=${token}`;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Forget Login Link',
      html: `<p>Click below to login:</p><a href="${magicLink}">${magicLink}</a>`,
    };

    await sendEmail(email, 'Forget Login Link', `<p>Click below to login:</p><a href="${magicLink}">${magicLink}</a>`);


    return res.status(200).json({ message: 'Login link sent to your email.' });
  } catch (err) {
    console.error('Error in requestLogin:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required.' });

    const results = await verifyLoginToken(token);
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const user = results[0];

    await deleteLoginToken(token);

    res.status(200).json({ message: 'Login successful', email: user.email, role: user.role });
  } catch (err) {
    console.error('Error in verifyToken:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


module.exports = {
  login,
  requestLogin,
  verifyToken,
  verifyJWTToken,
};
