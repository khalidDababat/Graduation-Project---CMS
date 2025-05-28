const express = require('express');
const router = express.Router();
const { login,requestLogin,verifyToken,verifyJWTToken  } = require('../controllers/authController');

// authController
router.post('/login', login); //Done
router.post('/request-login', requestLogin);//Done
router.post('/verify-token', verifyToken);// magic link
router.post('/verify-jwt', verifyJWTToken);// new: jwt verification

module.exports = router;
