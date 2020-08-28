'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.product,{through:models.Cart})
    }
  };
  user.init({
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'isEmpty'
        }
      }
    
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'isEmpty'
        }
      }
    
    },
    role: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'isEmpty'
        }
      }
    
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: (instance,options) => {
        instance.role = 'customer'
        instance.password=bcrypt.hashSync(instance.password,10)
      }
    }
  });
  return user;
};