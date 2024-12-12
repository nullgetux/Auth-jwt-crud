const fetch = require('node-fetch');
const crypto = require('crypto');
const { productPrepaids } = require('../models');

class DigiflazController {
  // Utility function to generate MD5 hash
  static generateSign(user, key, extra) {
    const signkey = user + key + extra;
    return crypto.createHash('md5').update(signkey).digest('hex');
  }

  // Utility function to make API requests
  static async fetchDataFromDigiflaz(cmd, extra, endpoint) {
    const user = process.env.DIGIFLAZ_USER;
    const key = process.env.DIGIFLAZ_KEY;

    const apiUrl = `${process.env.DIGIFLAZ_URL}/${endpoint}`;
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
      console.error(`Error fetching data: ${response.status} - ${errorBody}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
  }

  // Save products to the database
  static async saveProductsToDB(products) {
    try {
      for (const product of products) {
  
        try {
          // Perform the upsert operation for each product
          await productPrepaids.upsert({
          product_name: product.product_name,
          product_desc: product.desc,
          product_category: product.category,
          product_provider: product.brand,
          product_type: product.type,
          product_seller: product.seller_name,
          product_seller_price: product.price,
          product_sku: product.buyer_sku_code,
          product_unlimited_stok: product.unlimited_stock.toString(),
          product_stock: product.stock,
          product_multi: product.multi.toString(),
          });
  
          console.log('Product saved successfully:', product.product_name);
        } catch (error) {
          // Log any specific errors during the saving process
          console.error('Error saving product:', product.product_name, error);
          throw error;  // Optionally re-throw to stop further processing
        }
      }
  
      console.log('All products saved successfully.');
    } catch (error) {
      console.error('Error saving products to the database:', error);
      throw error;  // Re-throw to indicate failure at the higher level
    }
  }
  

  // Method to get and store Prepaid products
  static async getProduct_Prepaid(req, res) {
    try {
      const pricelist = await DigiflazController.fetchDataFromDigiflaz('prepaid', 'pricelist', 'price-list');

      const products = pricelist.data || [];


      if (!Array.isArray(products)) {
        throw new Error('Invalid data format: Expected an array of products');
      }
      
      // Save products to the database
      await DigiflazController.saveProductsToDB(products);

      res.status(200).json({
        success: true,
        message: 'Products fetched and stored successfully',
        data: products,
      });
    } catch (error) {
      console.error('Error fetching or saving products:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch and store products from Digiflaz',
      });
    }
  }

  // Method to get and store Pasca products
  static async getProduct_Pasca(req, res) {
    try {
      const pricelist = await DigiflazController.fetchDataFromDigiflaz('pasca', 'pricelist', 'price-list');
      const products = pricelist.data || [];

      if (!Array.isArray(products)) {
        throw new Error('Invalid data format: Expected an array of products');
      }

      // Save products to the database
      await DigiflazController.saveProductsToDB(products);

      res.status(200).json({
        success: true,
        message: 'Products fetched and stored successfully',
        data: products,
      });
    } catch (error) {
      console.error('Error fetching or saving products:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch and store products from Digiflaz',
      });
    }
  }
}

module.exports = DigiflazController;
