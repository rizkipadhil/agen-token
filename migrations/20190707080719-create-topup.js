'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('topups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      nominal: {
        type: Sequelize.INTEGER
      },
      taxcode: {
        type: Sequelize.STRING
      },
      uniquevalue: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('topups');
  }
};