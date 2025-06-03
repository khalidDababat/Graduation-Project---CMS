const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const complaintController = require('../controllers/complaintController');
const adminComplaintController = require('../controllers/adminComplaintController');


router.post('/submit', upload.array('attachments', 5), complaintController.submitComplaint);

router.get('/by-id-number/:ID_Number', complaintController.getComplaintsByCitizenIDNumber);

router.get('/employeeComplaints/:employeeId', complaintController.getAssignedComplaints);

router.get('/employee/assignedComplaints/:employee_id', adminComplaintController.getAssignedComplaints);

router.get('/employee/assignedComplaintsByEmployee/:employee_id', adminComplaintController.AssignedComplaintsByEmployee);


module.exports = router;
