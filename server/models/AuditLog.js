const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  module: String,
  timestamp: { type: Date, default: Date.now }
});

const AuditLog = mongoose.model('AuditLog', AuditLogSchema);
module.exports = AuditLog;