const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/studentModel');
const QrSession = require('../models/QrSession');
const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const LecturerUser = require('../models/lecturerModel');
const getHumanReadableLocation = require('../utils/geolocation');


exports.registerUser = async (req, res) => {
    try {
      const { name, index, phone, email, sex, program, password } = req.body;
      console.log(req.body);
  
      if (!name || !index || !phone || !email || !password || !sex || !program) {
        return res.status(400).json({ message: 'Please fill all fields' });
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, index, phone, email, sex, program, password: hashedPassword, role: 'student' });
      await user.save();
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error('Registration error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  



// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Student profile
exports.getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch user error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



// attendance Controller 2 + GPS Test
// exports.recordAttendance = async (req, res) => {
//   try {
//     const { code, latitude, longitude } = req.body;
//     const studentId = req.userId;

//     console.log('Received code:', code);
//     console.log('Received studentId:', studentId);
//     console.log('Received latitude:', latitude);
//     console.log('Received longitude:', longitude);

//     const qrSession = await QrSession.findOne({ code }).populate('session');
//     if (!qrSession) return res.status(404).json({ message: 'Invalid QR code' });
//     if (new Date() > qrSession.expiresAt) return res.status(410).json({ message: 'QR code expired' });

//     const sessionId = qrSession.session._id;

//     const alreadyMarked = await Attendance.findOne({ student: studentId, session: sessionId });
//     if (alreadyMarked) return res.status(409).json({ message: 'Already marked present for this session' });

//     // Convert lat/long to readable location
//     const location = await getHumanReadableLocation(latitude, longitude);

//     // Save attendance
//     await Attendance.create({
//       student: studentId,
//       session: sessionId,
//       scannedAt: new Date(),
//       location,
//       coordinates: {
//         type: 'Point',
//         coordinates: [longitude, latitude],
//       }
//     });

//     res.status(200).json({ message: 'Attendance recorded successfully', location });
//   } catch (err) {
//     console.error('Attendance error:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// 📍 Helper to calculate distance in meters using the Haversine formula
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of Earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.recordAttendance = async (req, res) => {
  try {
    const { code, latitude, longitude } = req.body;
    const studentId = req.userId;

    console.log('Received code:', code);
    console.log('Received studentId:', studentId);
    console.log('Received latitude:', latitude);
    console.log('Received longitude:', longitude);

    const qrSession = await QrSession.findOne({ code }).populate('session');
    if (!qrSession)
      return res.status(404).json({ message: 'Invalid QR code' });

    if (new Date() > qrSession.expiresAt)
      return res.status(410).json({ message: 'QR code expired' });

    const session = qrSession.session;
    const sessionId = session._id;

    const alreadyMarked = await Attendance.findOne({
      student: studentId,
      session: sessionId,
    });

    if (alreadyMarked)
      return res
        .status(409)
        .json({ message: 'Already marked present for this session' });

    // Validate location distance (max 50 meters allowed)
    const lecturerLat = session.location?.lat;
    const lecturerLon = session.location?.lon;

    if (!lecturerLat || !lecturerLon) {
      return res.status(400).json({
        message: 'Lecturer location not set. Cannot validate GPS range.',
      });
    }

    const distance = getDistanceFromLatLonInMeters(
      latitude,
      longitude,
      lecturerLat,
      lecturerLon
    );

    //const MAX_DISTANCE = 50;
    const MAX_DISTANCE = 0.03; // meters

    if (distance > MAX_DISTANCE) {
      return res.status(403).json({
        message: `You are too far from the attendance location. Distance: ${distance.toFixed(2)} meters`,
      });
    }

    // Convert lat/long to readable location
    const location = await getHumanReadableLocation(latitude, longitude);

    // ✅ Save attendance
    await Attendance.create({
      student: studentId,
      session: sessionId,
      scannedAt: new Date(),
      location,
      coordinates: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    res.status(200).json({
      message: 'Attendance recorded successfully',
      location,
      distance: `${distance.toFixed(2)} meters`,
    });
  } catch (err) {
    console.error('Attendance error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAttendanceHistory = async (req, res) => {
  try {
    const studentId = req.userId;

    const attendanceRecords = await Attendance.find({ student: studentId })
      .populate({
        path: 'session',
        populate: {
          path: 'lecturer',
          select: 'name email', // Select fields you want from LecturerUser
        },
      })
      .sort({ scannedAt: -1 });

    res.status(200).json({
      message: 'Attendance history retrieved successfully',
      data: attendanceRecords.map(record => ({
        sessionTitle: record.session.title,
        lecturerName: record.session.lecturer.name,
        lecturerEmail: record.session.lecturer.email,
        scannedAt: record.scannedAt,
        location: record.location || 'Location unavailable',
        coordinates: record.coordinates?.coordinates || [],
      })),
    });
  } catch (err) {
    console.error('Error fetching attendance history:', err.message);
    res.status(500).json({ message: 'Failed to retrieve attendance history' });
  }
};


const Student = require("../models/studentModel"); // Not Pratical, A VisionMark notice


exports.getStudentQrSessionsStatus = async (req, res) => {
  try {
    const studentId = req.userId;

    const studentData = await Student.findById(studentId);
    if (!studentData) return res.status(404).json({ message: 'Student not found' });

    const sessions = await Session.find({ program: studentData.program });

    const attendance = await Attendance.find({ student: studentId });
    const attendedSessionIds = new Set(attendance.map(att => att.session.toString()));

    // Map the sessions
    let response = sessions.map(session => ({
      sessionTitle: session.title,
      sessionId: session._id,
      qrCode: session._id,
      attended: attendedSessionIds.has(session._id.toString()),
      createdAt: session.createdAt,
    }));

    // Sort in descending order of creation time (LIFO)
    response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ sessions: response });
  } catch (error) {
    console.error('Error fetching QR session status:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

