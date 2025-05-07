// tests/inventory.test.js
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const inventoryRoutes = require("../inventory.routes");
const inventoryService = require("../inventory.service");

// tests/inventory.test.js
jest.mock("../inventory.service", () => ({
  getInventory: jest.fn(),
  addOrUpdateInventory: jest.fn(),
  reduceInventory: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());
app.use("/inventory", inventoryRoutes);

describe("Inventory API", () => {
  const productId = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /inventory/:productId", () => {
    it("should return product quantity", async () => {
      inventoryService.getInventory.mockResolvedValue(10);

      const res = await request(app).get(`/inventory/${productId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ productId, quantity: 10 });
    });
  });

  describe("POST /inventory/:productId", () => {
    it("should increase product quantity", async () => {
      inventoryService.addOrUpdateInventory.mockResolvedValue({
        productId,
        quantity: 20,
      });

      const res = await request(app)
        .post(`/inventory`) // since the route is router.post('/', ...)
        .send({ productId, quantity: 10 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ productId, quantity: 20 });
    });
  });

  describe("PUT /inventory/:productId/reduce", () => {
    it("should reduce product quantity", async () => {
      inventoryService.reduceInventory.mockResolvedValue({
        productId,
        quantity: 5,
      });

      const res = await request(app)
        .post(`/inventory/${productId}/reduce`) // method should match router.post
        .send({ quantity: 5 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ productId, quantity: 5 });
    });

    it("should return 400 for invalid reduction", async () => {
      inventoryService.reduceInventory.mockImplementation(() => {
        throw new Error("Insufficient stock");
      });

      const res = await request(app)
        .post(`/inventory/${productId}/reduce`) // method should match router.post
        .send({ quantity: 100 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Insufficient stock");
    });
  });
});
