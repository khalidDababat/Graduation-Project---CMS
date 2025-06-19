const express = require('express');
const router = express.Router();
const adminComplaintController = require('../controllers/adminComplaintController');


router.get('/viewComplaintInfo',adminComplaintController.getComplaintsInfo)
router.post('/filter-by-date', adminComplaintController.getFilteredComplaints);
router.post('/filter-complaints', adminComplaintController.filteredComplaints);

router.get('/dropdown-data', adminComplaintController.getDropdownData);

router.put('/updateStatusWithNote', adminComplaintController.updateStatusWithNote);
router.put('/updateStatus', adminComplaintController.updateStatus);



router.get('/getstatus', adminComplaintController.getComplaintByStatus);

router.get('/getCountstatus', adminComplaintController.countComplaintByStatus);

router.get('/getCountComplaints', adminComplaintController.countComplaints);


router.post('/assignComplaint', adminComplaintController.assignComplaint);
router.post('/returnComplaint', adminComplaintController.returnComplaint);
router.get('/incomingComplaints', adminComplaintController.getIncoming);
router.get('/outgoingComplaints', adminComplaintController.getOutgoing);

router.get('/view-image/:imageName', adminComplaintController.viewComplaintImage);

router.put('/:complaintId/change-department', adminComplaintController.updateDepartment);


// router.get('/download-image:imageName', adminComplaintController.downloadComplaintImage);
router.get('/download-images/:id', adminComplaintController.downloadComplaintImages);



router.get('/complaint/:id', adminComplaintController.getComplaintDetails);
router.delete('/deleteComplaint/:id', adminComplaintController.deleteComplaintbyadmin);//done




module.exports = router;