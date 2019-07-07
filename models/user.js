'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    saldo: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "member"
    },
    createdAt: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Order);
  };
  return User;
};