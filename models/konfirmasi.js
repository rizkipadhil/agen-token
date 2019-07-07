'use strict';
module.exports = (sequelize, DataTypes) => {
  const konfirmasi = sequelize.define('konfirmasi', {
    userId: DataTypes.INTEGER,
    topupId: DataTypes.INTEGER,
    banknumber: DataTypes.STRING,
    nama: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "proses"
    }
  }, {});
  konfirmasi.associate = function(models) {
    // associations can be defined here
    konfirmasi.belongsTo(models.User);
    konfirmasi.belongsTo(models.topup);
  };
  return konfirmasi;
};