const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitComplaint } = require('../controllers/complaintController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/complaints', upload.single('image'), submitComplaint);

module.exports = router;
