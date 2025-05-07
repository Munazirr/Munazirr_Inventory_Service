// controllers/inventory.controller.js

const inventoryService = require('../inventory.service');

exports.addStock = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const result = await inventoryService.addOrUpdateInventory(productId, quantity);
  res.status(200).json(result);
};

exports.getStock = async (req, res) => {
  const { productId } = req.params;
  const quantity = await inventoryService.getInventory(productId);
  res.status(200).json({ productId, quantity });
};

exports.reduceStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const result = await inventoryService.reduceInventory(productId, quantity);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
