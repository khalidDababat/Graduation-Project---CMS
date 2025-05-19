const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendResetEmail = (to, code, callback) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: 'Admin Password Reset Code',
    text: `Your reset code is: ${code}`
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = {
  sendResetEmail
};
