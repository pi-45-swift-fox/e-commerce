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
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        zeroValue(data) {
          if(data < 0) {
            throw new Error(`Quantity can't be less than zero!`)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};