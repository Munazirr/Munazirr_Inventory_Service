const express = require('express');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventory.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const db = require('./db');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/inventory', inventoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3002;
db.sync().then(() => {
  app.listen(PORT, () => console.log(`Inventory service running on port ${PORT}`));
});