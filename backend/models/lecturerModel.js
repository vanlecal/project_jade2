const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  sex: { type: String, required: true },
  role: { type: String, enum: ['student', 'lecturer'], required: false },
});

const User = mongoose.model('LecturerUser', userSchema);
module.exports = User;
