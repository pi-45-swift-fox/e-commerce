'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'need at least 1 quantity'
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.addHook('beforeCreate', (cart, options) => {
    cart.status = false
  })
  return Cart;
};