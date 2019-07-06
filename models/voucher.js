'use strict';
module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define('Voucher', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    harga: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    serialnumber: DataTypes.STRING,
    stok: DataTypes.INTEGER
  }, {});
  Voucher.associate = function(models) {
    Voucher.hasMany(models.Order, {
      foreignKey: 'voucherId',
      require: true
    });
  };
  return Voucher;
};