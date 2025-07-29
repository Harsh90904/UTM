const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['Admin', 'Accountant', 'Staff'] },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

const User = mongoose.model('User', UserSchema);
module.exports = User;