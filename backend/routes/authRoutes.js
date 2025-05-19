const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// authController 
router.post('/login', login);

module.exports = router;
