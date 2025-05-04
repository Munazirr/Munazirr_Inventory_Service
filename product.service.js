const axios = require('axios');
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

async function validateProduct(productId) {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
    return response.status === 200;
  } catch {
    return false;
  }
}

module.exports = { validateProduct };