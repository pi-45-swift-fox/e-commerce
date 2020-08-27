'use strict';
const fs = require('fs')
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
   const data = JSON.parse(fs.readFileSync('./db-Seed-user-Data.json', 'utf-8'))
   data.forEach(el => {
     el.password = Bcrypt.encrypt(el.password)
     el.createdAt = new Date()
     el.updatedAt = new Date()
   });
   return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
