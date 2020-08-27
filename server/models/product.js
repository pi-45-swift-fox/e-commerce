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
      // Product.belongsTo(models.User)
      // Product.hasMany(models.Transaction)
      Product.belongsToMany(models.User, {through: models.Cart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty : {
          msg : "Product name must be filled"
        }
      }
    },  
    image_url: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty : {
          msg : "Image URL must be filled"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull :false,
      validate : {
        notEmpty : {
          msg : "Price must be filled"
        },
        min : {
          args : 10000,
          msg : "Minimal price of the product should be 10000"
        },
        isInt : {
          msg : "Input price must be a number"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull :false,
      validate : {
        notEmpty : {
          msg : "Stock must be filled"
        },
        isInt : {
          msg : "Input stock must be a number"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  
  return Product;
};