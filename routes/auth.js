// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout (just a placeholder)
router.post('/logout', authController.logout);

module.exports = router;
