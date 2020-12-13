'use strict';
const { Model } = require('sequelize');
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
      User.belongsToMany(models.Product, { through: models.Cart });
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name is required!`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled!`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: `Email is required!`
        },
        notEmpty: {
          args: true,
          msg: `Email must be filled!`
        },
        isEmail: {
          args: true,
          msg: `Email must be in format yourname@example.com`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Password is required!`
        },
        notEmpty: {
          args: true,
          msg: `Password must be filled!`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Role is required!`
        },
        notEmpty: {
          args: true,
          msg: `Role must be filled!`
        }
      }
    }
  }, {
    hooks:{
      beforeSave(user){
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};