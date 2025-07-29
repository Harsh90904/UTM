const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerAccount' },
  reportType: { type: String, enum: ['GST', 'TDS', 'RTO', 'Payout'] },
  reportPath: String,
  generatedAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;