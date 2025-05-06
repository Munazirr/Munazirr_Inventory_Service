const express = require('express');
const sequelize = require('./sequelize'); // adjust if filename is different
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('Inventory service is up and running!');
});

// DB Connection Test & Server Start
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
