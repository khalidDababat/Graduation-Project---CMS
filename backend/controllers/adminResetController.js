const bcrypt = require('bcrypt');
const {
  findAdminByEmail,
  updateAdminPassword
} = require('../models/adminModel');

const { sendResetEmail } = require('../services/mailService');

let verificationCode = null;

const sendResetCode = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  findAdminByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Admin not found with this email' });

    verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    sendResetEmail(email, verificationCode, (err, info) => {
      if (err) return res.status(500).json({ message: 'Error sending email', error: err });
      res.status(200).json({ message: 'Reset code sent to email' });
    });
  });
};

const verifyCode = (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'Code is required' });

  if (code === verificationCode) {
    res.status(200).json({ message: 'Code verified' });
  } else {
    res.status(400).json({ message: 'Invalid code' });
  }
};

const resetPassword = (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ message: 'Email and new password are required' });

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    updateAdminPassword(email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });
};

module.exports = {
  sendResetCode,
  verifyCode,
  resetPassword
};
