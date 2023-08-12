const authService = require('../../app/services/authService');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Insert
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      nik: "12345",
      password: await authService.encryptPassword('12345'),
      role : "admin",
      image: "https://res.cloudinary.com/doilg1m0l/image/upload/v1685183704/image/psis/mx70kweibmc5nuqry4sc.png",
      name: 'admin',
      kelamin: "pria",
      tempatLahir: "padang",
      tanggalLahir: "29-05-2023",
      agama: "islam",
      alamat: "padang",
      telepon: "082377450000",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  // Delete
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
