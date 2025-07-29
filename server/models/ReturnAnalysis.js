const mongoose = require('mongoose');

const ReturnAnalysisSchema = new mongoose.Schema({
  sku: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerAccount' },
  returnCount: Number,
  totalOrders: Number,
  returnRate: Number,
  refundImpact: Number,
  updatedAt: { type: Date, default: Date.now }
});

const ReturnAnalysis = mongoose.model('ReturnAnalysis', ReturnAnalysisSchema);
module.exports = ReturnAnalysis;