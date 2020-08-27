'use strict';
const {Bcrypt} = require('../helpers')
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
      User.belongsToMany(models.Product, {through: models.Cart})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail: {
          msg : 'Invalid Email'
        },
        notEmpty : {
          msg : 'Email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Password must be filled'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,option)=>{
    user.password = Bcrypt.encrypt(user.password)
  })
  User.beforeCreate((user,option)=>{
    user.role = 'user'
  })
  return User;
};