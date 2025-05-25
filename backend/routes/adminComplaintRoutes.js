const express = require('express');
const router = express.Router();
const adminComplaintController = require('../controllers/adminComplaintController');


router.get('/viewComplaintInfo',adminComplaintController.getComplaintsInfo)// done
router.post('/filter-by-date', adminComplaintController.getFilteredComplaints);// done
router.post('/filter-complaints', adminComplaintController.filteredComplaints);// done

router.get('/dropdown-data', adminComplaintController.getDropdownData);//done
router.get('/view-image/:imageName', adminComplaintController.viewComplaintImage);//done
router.get('/download-image/:imageName', adminComplaintController.downloadComplaintImage);//done
router.get('/complaint/:id', adminComplaintController.getComplaintDetails);//done

router.delete('/deleteComplaint/:id', adminComplaintController.deleteComplaintbyadmin);//done

router.put('/updateStatus', adminComplaintController.updateStatus);//done



router.post('/assignComplaint', adminComplaintController.assignComplaint);
router.post('/returnComplaint', adminComplaintController.returnComplaint);
router.get('/incomingComplaints', adminComplaintController.getIncoming);
router.get('/outgoingComplaints', adminComplaintController.getOutgoing);





module.exports = router;