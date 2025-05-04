# Inventory_Service
# 📦 Inventory Microservice

This microservice manages stock quantities for products using Js. It verifies product existence through the Product Service before modifying inventory. Built as part of a scalable services assignment. It includes admin and customer-facing APIs, PostgreSQL database support, Dockerized setup, and Swagger documentation.

---

## ✅ Overview

The Inventory Service provides REST APIs to:
-  Add or update stock for products
- Retrieve current stock
- Reduce stock when an order is placed
- Communicates with the Product Service to verify product existence
- Dockerized with `docker-compose`
- Swagger UI for API documentation
---

## 🚀Tech Stack

- Node.js (Express.js)
- PostgreSQL
- Docker
- Swagger (OpenAPI for documentation)
-   Axios (for calling Product Service)
---

## ⚙️ Setup Instructions

### 1. 🧱Clone the Repository
```bash
git clone <your-repo-url>
cd inventory-service
```

### 2. 🔗Install Dependencies
```bash
npm install
```

### 3. 📌Setup Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3002
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventory_db
DB_PORT=5432
PRODUCT_SERVICE_URL=http://localhost:8080
```

### 4. Run Using Docker
```bash
docker-compose up --build
```
📍Visit the service at: `http://localhost:3002`  
Swagger Docs: `http://localhost:3002/api-docs`

### 5. Run Without Docker (Development Mode)
Ensure PostgreSQL is running locally:
```bash
npm start
```

---

## 🌐 Environment Variables

| Variable              | Description                                |
|-----------------------|--------------------------------------------|
| `PORT`                | Port on which inventory service runs       |
| `DB_HOST`             | Hostname of the PostgreSQL container       |
| `DB_PORT`             | Port PostgreSQL listens on                 |
| `DB_NAME`             | Name of the PostgreSQL database            |
| `DB_USER`             | PostgreSQL username                        |
| `DB_PASSWORD`         | PostgreSQL password                        |
| `PRODUCT_SERVICE_URL` | Base URL of the Product Service            |

---

## 🗃️ Database & Migrations

Using **Sequelize ORM** with `sequelize.sync()` for schema creation. In production, prefer `sequelize-cli` for migrations.

### Inventory Table Schema
| Column     | Type    | Description         |
|------------|---------|---------------------|
| id         | integer | Primary key         |
| productId  | integer | Product identifier  |
| quantity   | integer | Quantity in stock   |

---

## 📘 API Documentation

Available at: `http://localhost:3002/api-docs`

### 🛠️ POST `/inventory`
- Add or update stock for a product.
- **Request Body:**
```json
{
  "productId": 101,
  "quantity": 10
}
```

### 🛠️ GET `/inventory/{productId}`
- Fetch stock information by product ID.

### 🛠️ POST `/inventory/{productId}/reduce`
- Reduce stock for a product.
- **Request Body:**
```json
{
  "quantity": 2
}
```

---

## 🔁 Inter-Service Communication

Inventory Service calls the Product Service hosted at `http://localhost:8080` to validate the product ID:
```http
GET /products/{id}
```

---

## 🐳 Docker Setup

- `Dockerfile`: Configures the Node.js container.
- `docker-compose.yml`: Defines the inventory and postgres services.

To start everything:
```bash
docker-compose up --build
```

---

## 📝 License

This project is part of an M.Tech assignment for the Scalable Services subject.

---
