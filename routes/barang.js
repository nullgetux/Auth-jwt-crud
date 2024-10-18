// routes/barangRoutes.js
const express = require('express');
const authenticateToken = require('../middleware/auth');
const barangController = require('../controllers/barangController');

const router = express.Router();

// Create Barang
router.post('/', authenticateToken, barangController.createBarang);

// Read All Barang
router.get('/', authenticateToken, barangController.getAllBarang);

// Read Barang by ID
router.get('/:id', authenticateToken, barangController.getBarangById);

// Update Barang
router.put('/:id', authenticateToken, barangController.updateBarang);

// Delete Barang
router.delete('/:id', authenticateToken, barangController.deleteBarang);

module.exports = router;
