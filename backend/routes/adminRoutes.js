const express = require('express');
const router = express.Router();
const { updateAdminProfile,updatepassword } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/authMiddleware');

router.put('/update-profile', verifyToken, updateAdminProfile);



module.exports = router;
