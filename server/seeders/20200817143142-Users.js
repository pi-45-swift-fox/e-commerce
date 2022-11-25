'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // password (bcrypted) = 123456
    await queryInterface.bulkInsert('Users', [{
      email: "klaustin.wijaya@gmail.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "admin", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "admin@mail.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "admin", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "cdevey2@howstuffworks.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "admin", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "bukanadmin@mail.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "tgaine4@mac.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "beddis5@hubpages.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "bkilner6@g.co",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "gstlouis7@photobucket.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "cspinozzi8@vinaora.com",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }, {
      email: "dtumility9@pbs.org",
      password: '$2a$10$joGIl6Cmu/RyP8iPV711g.fdX8k1/x/S7twXdRye8bKMcUyORyM4i',
      role: "user", createdAt: new Date(), updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', "user", {});
     */

    await queryInterface.bulkDelete('Users', "user", {});
  }
};
