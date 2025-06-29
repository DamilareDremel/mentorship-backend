"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Sessions", "requestId", {
      type: Sequelize.INTEGER,
      allowNull: true, // for now to avoid existing null conflict
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Sessions", "requestId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
