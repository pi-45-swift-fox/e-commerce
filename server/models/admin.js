'use strict';
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
      isEmail: true,
      allowNull: false,
      validate: {
          notNull: {
              args: true,
              msg: 'Email required.'
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
                args: [4, 18],
                msg: 'Password length must between 4 or 18 Characters.'
            }
        }
    },
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};