const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const complaintController = require('../controllers/complaintController');

router.post('/submit', upload.array('attachments', 5), complaintController.submitComplaint);

module.exports = router;
