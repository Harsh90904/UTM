const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerAccount', required: true },
  category: String,
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;