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
  updateUserPassword,
} = require('../models/authModel');
const { sendEmail } = require('../services/mailService');


exports.login = async (req, res) => {
  const { role } = req.body;

  if (!role) 
      return res.status(400).json({ message: 'Role is required.' });

  try {
    if (role === 'admin') {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ message: 'Username and password are required for admin.' });

      
      
      const results = await findAdminByUsername(username);
      if (results.length === 0){
        return res.status(401).json({ message: 'Invalid admin credentials.' });
      }
      const admin = results[0];

     
      // console.log("user ", password);
      // console.log("DB ", admin.password);
      // const hashedPassword = await bcrypt.hash(password, 10);

      // console.log("hashedPassword ", hashedPassword);

      const isMatch = await bcrypt.compare(password, admin.password);
      // console.log(isMatch)
      
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

exports.verifyJWTToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, data: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};

exports.requestLogin = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email || !role) return res.status(400).json({ message: 'Email and role are required.' });

    const user = await findUserByEmail(email, role);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
     }
    //  const user_Id = user[0].id;
     
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await storeLoginToken(email, role, token, expiresAt);

    const link = `http://localhost:3000/magic-login?token=${token}&role=${role}`;
    const html = `
      <p>لقد طلبت إعادة تعيين كلمة المرور.</p>
      <p>اضغط على الرابط التالي:</p>
      <a href="${link}">إعادة تعيين كلمة المرور</a>
      <p>إذا لم تطلب ذلك، تجاهل الرسالة.</p>
    `;

    await sendEmail(email, 'رابط إعادة تعيين كلمة المرور', html);
    res.status(200).json({ message: 'Reset link sent to your email.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required.' });

    const result = await verifyLoginToken(token);
    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }
    const tokenData = result[0];
    const { email, role } = tokenData;

    
    const userResults = await findUserByEmail(email, role);

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const user = userResults[0];

    await deleteLoginToken(token);

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json({
      message: 'Token verified.',
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.verifyToken = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ message: 'Token is required.' });

//     const result = await verifyLoginToken(token);
//     if (result.length === 0) {
//       return res.status(400).json({ message: 'Invalid or expired token.' });
//     }
//     const user = result[0];
//     // const userId = user.user_Id;

//     await deleteLoginToken(token);

//     const jwtToken = jwt.sign(
//       { id: user.user_Id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     res.status(200).json({
//       message: 'Token verified.',
//       token: jwtToken,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, userId, role, token } = req.body;
    if (!password || !confirmPassword || !userId || !role || !token)
      return res.status(400).json({ message: 'All fields are required.' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id != userId || decoded.role !== role)
      return res.status(401).json({ message: 'Invalid token.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPassword(userId, hashedPassword, role);

    res.status(200).json({ message: 'Password reset successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

