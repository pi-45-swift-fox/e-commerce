'use strict';
const { generatePassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Email required.'
        },
        isEmail: {
          args: true,
          msg: "Must be an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Required.'
        },
        len: {
          args: [6, 12],
          msg: 'Password length must between 6 or 12 Characters.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(Admin, options) {
        Admin.password = generatePassword(Admin.password)
      }
    },
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};