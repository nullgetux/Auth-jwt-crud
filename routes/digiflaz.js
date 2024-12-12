// routes/digiflaz.js
const express = require('express');
const DigiflazController = require('../controllers/digiflazController');

const router = express.Router();

// getproduct_prepaid
router.post('/prepaid', DigiflazController.getProduct_Prepaid);

// getproduct_pasca
router.post('/pasca', DigiflazController.getProduct_Pasca);

module.exports = router;
