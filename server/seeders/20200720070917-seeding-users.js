'use strict';
const { hashing } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: hashing(`12345`),
      role: 'admin',
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      email: 'costumer@mail.com',
      password: hashing(`12345`),
      role: 'costumer',
      updatedAt: new Date(),
      createdAt: new Date()
    }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
