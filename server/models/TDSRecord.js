const mongoose = require('mongoose');

const TDSRecordSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerAccount' },
  tdsAmount: Number,
  statementGenerated: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const TDSRecord = mongoose.model('TDSRecord', TDSRecordSchema);
module.exports = TDSRecord;