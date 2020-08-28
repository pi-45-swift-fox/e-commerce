'use strict';
const {Bcrypt} = require('../helpers')

module.exports = {
  up: (queryInterface, Sequelize) => {
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
       email: 'admin@hot.id',
       password: Bcrypt.encrypt('1234'),
       role: 'admin',
       createdAt : new Date(),
       updatedAt : new Date()
     }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
