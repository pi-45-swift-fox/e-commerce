'use strict';
const fs = require('fs')
const product = JSON.parse(fs.readFileSync('products.json', 'utf8'))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', product, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
