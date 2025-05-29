const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const complaintController = require('../controllers/complaintController');

router.post('/submit', upload.array('attachments', 5), complaintController.submitComplaint);

router.get('/by-id-number/:ID_Number', complaintController.getComplaintsByCitizenIDNumber);

router.get('/employeeComplaints/:employeeId', complaintController.getAssignedComplaints);


module.exports = router;
