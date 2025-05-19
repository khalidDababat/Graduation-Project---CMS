const express = require('express');
const router = express.Router();
const {
  sendResetCode,
  verifyCode,
  resetPassword
} = require('../controllers/adminResetController');

router.post('/admin/send-reset-code', sendResetCode);
router.post('/admin/verify-code', verifyCode);
router.post('/admin/reset-password', resetPassword);

module.exports = router;