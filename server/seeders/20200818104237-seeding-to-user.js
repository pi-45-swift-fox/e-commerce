'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let encPassword = bcrypt.hashSync('1234',10)
   await queryInterface.bulkInsert('Users', [{
     email: 'admin@mail.com',
     password:encPassword,
     role:'admin',
     createdAt :new Date(),
     updatedAt :new Date()
   }], {})

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
