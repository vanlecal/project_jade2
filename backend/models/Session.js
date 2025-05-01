// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: false,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LecturerUser',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
