const Inventory = require('../models/inventory.model');
const { validateProduct } = require('./product.service');

async function addStock(productId, quantity) {
  const valid = await validateProduct(productId);
  if (!valid) throw new Error('Product not found');

  const existing = await Inventory.findOne({ where: { productId } });
  if (existing) {
    existing.quantity += quantity;
    return await existing.save();
  } else {
    return await Inventory.create({ productId, quantity });
  }
}

async function getStock(productId) {
  return await Inventory.findOne({ where: { productId } });
}

async function reduceStock(productId, quantity) {
  const record = await Inventory.findOne({ where: { productId } });
  if (!record || record.quantity < quantity) throw new Error('Insufficient stock');

  record.quantity -= quantity;
  return await record.save();
}

module.exports = { addStock, getStock, reduceStock };