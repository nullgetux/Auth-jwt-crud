// routes/digiflaz.js
const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// getproduct_prepaid
router.post('/generate', transactionController.topup);

module.exports = router;
