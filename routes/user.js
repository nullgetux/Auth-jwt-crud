// routes/userRoutes.js
const express = require('express');
//const authenticateToken = require('../middleware/auth');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Create User
router.post('/', verifyToken, authorizeRoles('admin'), userController.createUser);

// Read All Users
router.get('/', verifyToken, authorizeRoles('user'), userController.getAllUsers);

// Read User by ID
router.get('/:id', verifyToken, authorizeRoles('admin'), userController.getUserById);

// Update User
router.put('/:id', verifyToken, authorizeRoles('admin'), userController.updateUser);

// Delete User
router.delete('/:id', verifyToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
