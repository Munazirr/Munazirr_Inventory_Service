// models/inventory.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Inventory = sequelize.define('Inventory', {
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Inventory;
