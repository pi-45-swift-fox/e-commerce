'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {through: 'Cart'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'product name must not empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'image_url must not empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      min: {
        args: 1,
        msg: '1 or more price required'
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: '1 or more stock required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};