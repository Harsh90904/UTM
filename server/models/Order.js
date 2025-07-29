const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerAccount",
  },
  marketplace: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Delivered", "Return", "RTO"],
  },
  orderDate: Date,
  amount: Number,
  tdsDeducted: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
