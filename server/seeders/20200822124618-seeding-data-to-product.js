'use strict';
const fs = require('fs')

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
   const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
   data.forEach(el => {
     el.createdAt = new Date()
     el.updatedAt = new Date()
   });
   return queryInterface.bulkInsert('Products', data, {});
  },
  own: (queryInterface, Sequelize) => {
   /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Products', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
