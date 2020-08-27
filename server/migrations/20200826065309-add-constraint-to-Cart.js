'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDeleted: 'CASCADE',
      onUpdated: 'CASCADE'
    })
      .then(() => {
        return queryInterface.addConstraint('Carts', {
          fields: ['ProductId'],
          type: 'foreign key',
          name: 'fkey_ProductId',
          references: { //Required field
            table: 'Products',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'fkey_UserId', {})
      .then(() => {
        return queryInterface.removeConstraint('Carts', 'fkey_ProductId', {})
      })
  }
};
