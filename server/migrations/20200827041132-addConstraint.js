'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('Carts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'custom_fkey_userId',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(()=>{
      return queryInterface.addConstraint('Carts', {
        fields: ['productId'],
        type: 'foreign key',
        name: 'custom_fkey_productId',
        references: { //Required field
          table: 'products',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    })
    ;
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('Carts','productId',{})
      .then(()=>{
        return queryInterface.removeConstraint('Carts','userId',{})
      })
  }
};
