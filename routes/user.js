// routes/userRoutes.js
const express = require('express');
const authenticateToken = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

// Create User
router.post('/', authenticateToken, userController.createUser);

// Read All Users
router.get('/', authenticateToken, userController.getAllUsers);

// Read User by ID
router.get('/:id', authenticateToken, userController.getUserById);

// Update User
router.put('/:id', authenticateToken, userController.updateUser);

// Delete User
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
