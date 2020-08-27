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
      Product.belongsToMany(models.User, {through: models.Cart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Please input name of product'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Please input image link of product'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:'Please input price of product'
        },
        min:{
          args:1,
          msg:'Please input price above 0'
        },
        isInt:{
          args:true,
          msg:'Please input number only'
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:'Please input stock of product'
        },
        isInt:{
          args:true,
          msg:'Please input number only'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};