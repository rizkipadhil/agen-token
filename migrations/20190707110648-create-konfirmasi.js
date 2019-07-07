'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('konfirmasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      topupId: {
        type: Sequelize.INTEGER
      },
      banknumber: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "proses"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('konfirmasis');
  }
};