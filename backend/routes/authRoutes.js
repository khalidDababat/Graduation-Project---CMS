const express = require('express');
const router = express.Router();
const { login,verifyJWTToken,requestLogin, verifyToken, resetPassword  } = require('../controllers/authController');

// authController
router.post('/login', login); //Done
router.post('/request-login', requestLogin);//Done
router.post('/verify-token', verifyToken); //Done
router.post('/reset-password', resetPassword);//Done

router.post('/verify-jwt', verifyJWTToken);// new: jwt verification

module.exports = router;
