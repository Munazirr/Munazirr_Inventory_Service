const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Inventory = sequelize.define('Inventory', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Inventory;
