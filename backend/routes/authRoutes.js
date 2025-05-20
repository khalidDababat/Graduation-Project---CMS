const express = require('express');
const router = express.Router();
const { login,requestLogin,verifyToken } = require('../controllers/authController');

// authController
router.post('/login', login); //Done
router.post('/request-login', requestLogin);//Done
router.post('/verify-token', verifyToken);//Done

module.exports = router;
