'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{
      type :DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`email cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`email cannot be empty`
        }
      }
    },
    password: {
      type :DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`password cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`password cannot be empty`
        }
      }
    },
    role: {
      type :DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:`role cannot be empty`
        },
        notEmpty:{
          args:true,
          msg:`role cannot be empty`
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};