'use strict';
module.exports = (sequelize, DataTypes) => {
  const topup = sequelize.define('topup', {
    userId: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER,
    taxcode: DataTypes.STRING,
    uniquevalue: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "proses"
    }
  }, {});
  topup.associate = function(models) {
    // associations can be defined here
    topup.belongsTo(models.User);
  };
  return topup;
};