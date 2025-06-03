const express = require('express');
const router = express.Router();
const adminComplaintController = require('../controllers/adminComplaintController');


router.get('/viewComplaintInfo',adminComplaintController.getComplaintsInfo)// done
router.post('/filter-by-date', adminComplaintController.getFilteredComplaints);
router.post('/filter-complaints', adminComplaintController.filteredComplaints);

router.get('/dropdown-data', adminComplaintController.getDropdownData);//done

router.put('/updateStatus', adminComplaintController.updateStatus);//done

router.get('/getstatus', adminComplaintController.getComplaintByStatus);//done

router.get('/getCountstatus', adminComplaintController.countComplaintByStatus);// done

router.get('/getCountComplaints', adminComplaintController.countComplaints);// done


router.post('/assignComplaint', adminComplaintController.assignComplaint);//Done
router.post('/returnComplaint', adminComplaintController.returnComplaint);//Done
router.get('/incomingComplaints', adminComplaintController.getIncoming);//done
router.get('/outgoingComplaints', adminComplaintController.getOutgoing);//done

router.get('/view-image/:imageName', adminComplaintController.viewComplaintImage);//done
router.get('/download-image/:imageName', adminComplaintController.downloadComplaintImage);//done
router.get('/complaint/:id', adminComplaintController.getComplaintDetails);//done
router.delete('/deleteComplaint/:id', adminComplaintController.deleteComplaintbyadmin);//done




module.exports = router;