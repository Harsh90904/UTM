const { Router } = require("express");
const orderRouter = Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controller/OrderController");

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
