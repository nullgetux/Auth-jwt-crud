// controllers/barangController.js
const bcrypt = require('bcrypt');
const {Barang} = require('../models');

const barangController = {
    // Create Barang
    createBarang: async (req, res) => {
        const { nama, kategori, stok, harga } = req.body;
        try {
            const barang = await Barang.create(
                { 
                    nama, 
                    kategori, 
                    stok ,
                    harga
                });
            res.status(201).json(
                { 
                    message: 'Barang created successfully', 
                    barang 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Barang creation failed', 
                    details: error.message 
                });
        }
    },

    // Read All Barang
    getAllBarang: async (req, res) => {
        try {
            const barang = await Barang.findAll();
            res.status(200).json(barang);
        } catch (error) {
            res.status(400).json({ error: 'Failed to retrieve barang', details: error.message });
        }
    },

    // Read Barang by ID
    getBarangById: async (req, res) => {
        const { id } = req.params;
        try {
            const barang = await Barang.findByPk(id);
            if (!barang) {
                return res.status(404).json(
                    { 
                        error: 'Barang not found' 
                    });
            }
            res.status(200).json(barang);
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Failed to retrieve barang', 
                    details: error.message 
                });
        }
    },

    // Update Barang
    updateBarang: async (req, res) => {
        const { id } = req.params;
        const { nama, kategori, stok, harga } = req.body;
        try {
            const barang = await Barang.findByPk(id);
            if (!barang) {
                return res.status(404).json(
                    { 
                        error: 'Barang not found' 
                    });
            }

            barang.nama = nama || barang.nama;
            barang.kategori = kategori || barang.kategori;
            barang.stok = stok || barang.stok;
            barang.harga = harga || barang.harga;

            await barang.save();
            res.status(200).json(
                { 
                    message: 'Barang updated successfully', 
                    barang 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Barang update failed', 
                    details: error.message 
                });
        }
    },

    // Delete Barang
    deleteBarang: async (req, res) => {
        const { id } = req.params;
        try {
            const barang = await Barang.findByPk(id);
            if (!barang) {
                return res.status(404).json(
                    { 
                        error: 'Barang not found' 
                    });
            }
            await barang.destroy();
            res.status(200).json(
                { 
                    message: 'Barang deleted successfully' 
                });
        } catch (error) {
            res.status(400).json(
                { 
                    error: 'Barang deletion failed', 
                    details: error.message 
                });
        }
    },
};

module.exports = barangController;
