'use strict';
const bcrypt=require('bcrypt');
module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('users', [
    {
      email: 'admin@mail.com',
      password: bcrypt.hashSync('123456',10),
      role:'admin',
      createdAt:new Date(),
      updatedAt:new Date()
    },
     {
       email: 'user@mail.com',
       password: bcrypt.hashSync('123456',10),
       role:'user',
       createdAt:new Date(),
       updatedAt:new Date()
     }], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users',null,{})
  }
};
