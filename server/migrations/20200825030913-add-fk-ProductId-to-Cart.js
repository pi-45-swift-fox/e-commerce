'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts',"ProductId",
      {type: Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'custom_fkey_ProductId')
  }
};
