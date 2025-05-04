const service = require('../services/inventory.service');

exports.addStock = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await service.addStock(productId, quantity);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStock = async (req, res) => {
  try {
    const stock = await service.getStock(req.params.productId);
    if (stock) res.json(stock);
    else res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reduceStock = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;
  try {
    const updated = await service.reduceStock(productId, quantity);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
