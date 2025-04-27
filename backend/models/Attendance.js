// // models/Attendance.js
// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'StudentUser',
//     required: true,
//   },
//   session: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Session',
//     required: true,
//   },
//   scannedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Attendance', attendanceSchema);






const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentUser',
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String, // e.g. "1330 Middle Avenue, Menlo Park, California"
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    }
  }
});

// Optional: create a 2dsphere index for location queries
attendanceSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Attendance', attendanceSchema);
