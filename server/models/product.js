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
    }
  };
  Product.init({
    name: {
      type :DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`name cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`name cannot be empty`
        }
      }
    },
    image_url:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`image url cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`image url cannot be empty`
        },
        isUrl:{
          msg:`url format not valid`
        }
      }
    },
    price:{
      type: DataTypes.DOUBLE,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`price cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`price cannot be empty`
        },
        isNumeric:{
          msg:`price must be Number`
        },
        min:{
          args:[0],
          msg:`price must be positif number`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`stock cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`stock cannot be empty`
        },
        isNumeric:{
          msg:`stock must be Number`
        },
        min:{
          args:[0],
          msg:`stock cannot be negative`
        }
      }
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`sold cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`sold cannot be empty`
        },
        isNumeric:{
          msg:`sold must be Number`
        },
        min:{
          args:[0],
          msg:`sold cannot be negative`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};