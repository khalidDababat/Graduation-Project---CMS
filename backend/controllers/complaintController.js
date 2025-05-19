const { findOrCreateUser } = require('../models/User');
const { createComplaint } = require('../models/Complaint');

const submitComplaint = (req, res) => {
  const { full_name, phone, email, ID_number, department_id, title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  findOrCreateUser({ full_name, phone, email, ID_number }, (err, userId) => {
    if (err) {
      console.error('User error:', err);
      return res.status(500).json({ message: 'User error' });
    }

// create complint
    const complaintData = {
      user_id: userId,
      department_id,
      title,
      description,
      image
    };

    createComplaint(complaintData, (err, result) => {
      if (err) {
        console.error('Complaint error:', err);
        return res.status(500).json({ message: 'Error saving complaint' });
      }

      res.status(201).json({ message: 'Complaint submitted successfully' });
    });
  });
};
module.exports = { submitComplaint };
