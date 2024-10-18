'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Barangs', [
      {
        nama: 'Barang A',
        kategori: 'Kategori 1',
        stok: 100,
        harga: 100000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Barang B',
        kategori: 'Kategori 2',
        stok: 50,
        harga: 250000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Barangs', null, {});
  }
};
