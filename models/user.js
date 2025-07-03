'use strict';
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
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    bio: DataTypes.STRING,
    skills: DataTypes.ARRAY(DataTypes.STRING),
    goals: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate(async (user, options) => {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

  return User;
};