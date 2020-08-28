'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userAdmin = {
      email: 'admin@mail.com',
      password: '1234',
      role: 'admin'
    }
    const encryptedPs = bcrypt.hashSync(userAdmin.password, 10)
    await queryInterface.bulkInsert('Users', [{
      email: userAdmin.email,
      password: encryptedPs,
      role: userAdmin.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users',  null, {});
  }
};
