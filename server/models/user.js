'use strict';
const { generatePassword } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, { through: 'Carts', as: 'users', foreignKey: 'userId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "please input email format"
        },
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
    },
    balance: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(User, options) {
        User.password = generatePassword(User.password)
        User.balance = 0
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};