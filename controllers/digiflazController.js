const fetch = require('node-fetch');
const crypto = require('crypto');

class DigiflazController {
  // Utility function to generate MD5 hash
  static generateSign(user, key, extra) {
    const data = user + key + extra;
    return crypto.createHash('md5').update(data).digest('hex');
  }

  // Utility function to make API requests
  static async fetchDataFromDigiflaz(cmd, extra, endpoint) {
    const user = process.env.DIGIFLAZ_USER;
    const key = process.env.DIGIFLAZ_KEY;

    // Build the complete API URL dynamically using environment variable
    const apiUrl = `${process.env.DIGIFLAZ_URL}/${endpoint}`;

    // Use different 'sign' generation logic based on extra parameter
    const sign = DigiflazController.generateSign(user, key, extra);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cmd: cmd,
        username: user,
        sign: sign,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error fetching products: ${response.status} - ${errorBody}`);
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return response.json();
  }

  // Method to get Prepaid products
  static async getProduct_Prepaid(req, res) {
    try {
      const data = await DigiflazController.fetchDataFromDigiflaz('prepaid', 'pricelist', 'price-list');
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products from Digiflaz',
      });
    }
  }

  // Method to get Pasca products
  static async getProduct_Pasca(req, res) {
    try {
      const data = await DigiflazController.fetchDataFromDigiflaz('pasca', 'pricelist', 'price-list');
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products from Digiflaz',
      });
    }
  }

}

module.exports = DigiflazController;
