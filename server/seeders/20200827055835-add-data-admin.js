'use strict';
const { generatePassword } = require('../helpers/bcrypt')
const Administrator = {
  email: 'admin@mail.com',
  password: generatePassword('administrator'),
  createdAt: new Date(),
  updatedAt: new Date()
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [Administrator], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {})
  }
};
