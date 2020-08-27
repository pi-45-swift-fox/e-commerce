'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsToMany(models.user,{through:models.Cart})
    }
  };
  product.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'IS EMPTY'
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'IS EMPTY'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate:{
        min:{
          args: [0],
          msg:'should be more than 0'
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      validate:{
        min:{
          args: [0],
          msg:'should be more than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};