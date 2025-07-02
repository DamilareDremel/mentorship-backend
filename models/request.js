'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Request.belongsTo(models.User, { as: 'mentee', foreignKey: 'menteeId' });
      Request.belongsTo(models.User, { as: 'mentor', foreignKey: 'mentorId' });
    }
  }
  Request.init({
    menteeId: DataTypes.INTEGER,
    mentorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};