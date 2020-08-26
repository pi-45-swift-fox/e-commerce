'use strict';

const { generate } = require('../helpers/bcrypt')

const payload = {
    email: 'admin@mail.com',
    password: generate('administrator'),
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
}
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Admins', [payload], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Admins', null, {})
    }
};