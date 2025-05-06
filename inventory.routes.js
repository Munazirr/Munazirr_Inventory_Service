const express = require('express');
const controller = require('./controllers/inventory.controller.js');
const router = express.Router();

router.post('/', controller.addStock);
router.get('/:productId', controller.getStock);
router.post('/:productId/reduce', controller.reduceStock);

module.exports = router;