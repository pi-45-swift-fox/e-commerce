'use strict';
const bcrypt = require('bcryptjs');
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
      // define association here
      User.belongsToMany(models.Product, { through: models.Cart });
    }
  };
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Input e-mail'
        },
        notNull: {
          args: true,
          msg: 'E-mail is not declared'
        },
        notEmpty: {
          args: true,
          msg: 'E-mail has no value'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is not declared'
        },
        notEmpty: {
          args: true,
          msg: 'Password is declared but has no value'
        }
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      notEmpty: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, option) => {
    try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;  
    } catch (error) {
      console.log(error);
    }
  })
  return User;
};