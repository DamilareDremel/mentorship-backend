'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.User, { as: 'mentee', foreignKey: 'menteeId' });
      Session.belongsTo(models.User, { as: 'mentor', foreignKey: 'mentorId' });
      Session.belongsTo(models.Request, { as: 'request', foreignKey: 'requestId' });
    }
  }

  Session.init({
    menteeId: DataTypes.INTEGER,
    mentorId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    status: DataTypes.STRING,
    menteeFeedback: DataTypes.STRING,
    menteeRating: DataTypes.INTEGER,
    mentorFeedback: DataTypes.STRING,
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: true // make it true for now to avoid migration issue
    }
  }, {
    sequelize,
    modelName: 'Session',
  });

  return Session;
};
