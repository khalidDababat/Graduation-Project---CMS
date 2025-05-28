const { findAdminById, updateAdminInfo, updateAdminPassword } = require('../models/adminModel');
const bcrypt = require('bcrypt');

const updateAdminProfile = async (req, res) => {
  const { id, role } = req.user;
  const { username, email, password, confirmPassword } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized. Only admins can update this profile.' });
  }

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Username, email, password and confirmPassword are required.' });
  }

  try {
    const admin = await findAdminById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    await updateAdminInfo(id, username, email);

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await updateAdminPassword(id, hashed);

    return res.status(200).json({ message: 'Admin profile updated successfully.' });

  } catch (err) {
    console.error('Error updating admin profile:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateAdminProfile,
};
