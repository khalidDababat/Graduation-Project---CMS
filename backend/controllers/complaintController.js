const complaintService = require('../services/complaintService');
const complaintModel = require('../models/complaintModel');
const moment = require('moment');

exports.submitComplaint = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'At least one file is required.' });
    }

    const fileNames = files.map(file => file.filename).join(',');

    const {
      full_name,
      ID_number,
      phone,
      email,
      department_id,
      title,
      description
    } = req.body;

    if (!ID_number || !phone  || !department_id || !title || !description) {
      return res.status(400).json({ message: 'fields are required.' });
    }
     // HH:mm:ss
   const created_at = moment().format('YYYY-MM-DD ');

    const userData = {
      full_name,
      ID_number,
      phone,
      email,
      admin_id: null
    };

    const complaintData = {
      title,
      description,
      department_id,
      status: 'new',
      image_path: fileNames,
      admin_id: null,
      Note: null,
      created_at
    };

    await complaintService.submitComplaint(userData, complaintData);

    res.status(200).json({ message: 'Complaint submitted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getComplaintsByCitizenIDNumber = async (req, res) => {
  const { ID_Number } = req.params;

  if (!ID_Number) {
    return res.status(400).json({ message: 'ID Number is required.' });
  }

  try {
    const complaints = await complaintModel.getComplaintsByCitizenIDNumber(ID_Number);
    
    if (!complaints) {
  return res.status(500).json({ message: 'Failed to fetch complaints.' });
}
    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this ID number.' });
    }
    // console.log("complaints ",complaints)
    return res.status(200).json({ complaints});
  } catch (err) {
    console.error('Error fetching complaints:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};