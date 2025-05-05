const express = require('express');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventory.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const db = require('./db');
const { Inventory } = require('./models');

async function seedInventory() {
  const exists = await Inventory.count();
  if (exists === 0) {
    await Inventory.bulkCreate([
      { productId: 101, quantity: 50 },
      { productId: 102, quantity: 30 },
      { productId: 103, quantity: 25 }
    ]);
    console.log("Default inventory seeded.");
  }
}
seedInventory();

dotenv.config();
const app = express();
app.use(express.json());
app.use('/inventory', inventoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3002;
db.sync().then(() => {
  app.listen(PORT, () => console.log(`Inventory service running on port ${PORT}`));
});
