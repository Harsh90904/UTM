const Order = require('../models/Order');

/**
 * Create a new order
 */
const createOrder = async (req, res) => {
  try {
    const { orderId, sellerID, marketplace, status, orderDate, amount, tdsDeducted } = req.body;

    // Validation
    if (!orderId || !sellerID || !marketplace || !status || !orderDate || amount == null || tdsDeducted == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      orderId,
      sellerID,
      marketplace,
      status,
      orderDate,
      amount,
      tdsDeducted,
    });

    await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get all orders
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('sellerID', 'name marketplace');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get order by ID
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('sellerID', 'name marketplace');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update an order
 */
const updateOrder = async (req, res) => {
  try {
    const { orderId, sellerID, marketplace, status, orderDate, amount, tdsDeducted } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderId, sellerID, marketplace, status, orderDate, amount, tdsDeducted },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete an order
 */
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};