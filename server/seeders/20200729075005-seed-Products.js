'use strict';
const fs = require('fs')
const product = JSON.parse(fs.readFileSync('product.json', 'utf8'))
product.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', product, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};