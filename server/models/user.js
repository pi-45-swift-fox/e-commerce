'use strict';
const { generate } = require('../helpers/bcrypt')
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
      User.belongsToMany(models.Product, { through: 'UserProducts', as: 'user', foreignKey: 'userId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
      validate: {
          notNull: {
              args: true,
              msg: 'Email required.'
          }
      }
    },
    username: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Password Required.'
            },
            len: {
                args: [4, 10],
                msg: 'Password length must between 4 or 10 Characters.'
            }
        }
    },
    balance: {
        type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate(User) {
          User.password = generate(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};