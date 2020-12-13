'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Cart });
      Product.belongsTo(models.Banner)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name cannot be empty' },
        notEmpty: { msg: 'name cannot be empty' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'incorrect format for image url' },
        notEmpty: { msg: 'name cannot be empty' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { 
          args: [0],
          msg: 'price must be equal or greater than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'stock must be equal or greater than 0'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Category is required.`
        },
        notEmpty: {
          msg: `Category must be provided!`
        }
      } 
    },
    BannerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};