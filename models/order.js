'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    voucherId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User);
    Order.belongsTo(models.Voucher);
  };
  return Order;
};