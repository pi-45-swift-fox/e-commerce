'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts',"UserId",
      {type: Sequelize.INTEGER,
        references:{
          model:"Users",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
       })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'UserId')
  }
};
