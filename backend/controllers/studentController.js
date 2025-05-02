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
exports.recordAttendance = async (req, res) => {
  try {
    const { code, latitude, longitude } = req.body;
    const studentId = req.userId;

    console.log('Received code:', code);
    console.log('Received studentId:', studentId);
    console.log('Received latitude:', latitude);
    console.log('Received longitude:', longitude);

    const qrSession = await QrSession.findOne({ code }).populate('session');
    if (!qrSession) return res.status(404).json({ message: 'Invalid QR code' });
    if (new Date() > qrSession.expiresAt) return res.status(410).json({ message: 'QR code expired' });

    const sessionId = qrSession.session._id;

    const alreadyMarked = await Attendance.findOne({ student: studentId, session: sessionId });
    if (alreadyMarked) return res.status(409).json({ message: 'Already marked present for this session' });

    // Convert lat/long to readable location
    const location = await getHumanReadableLocation(latitude, longitude);

    // Save attendance
    await Attendance.create({
      student: studentId,
      session: sessionId,
      scannedAt: new Date(),
      location,
      coordinates: {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    });

    res.status(200).json({ message: 'Attendance recorded successfully', location });
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


const Student = require("../models/studentModel");

exports.getStudentQrSessionsStatus = async (req, res) => {
  try {
    const studentId = req.userId;

    // ✅ Use the Student model here
    const studentData = await Student.findById(studentId);
    if (!studentData) return res.status(404).json({ message: 'Student not found' });

    // Find all sessions for this program
    const sessions = await Session.find({ program: studentData.program });
    const sessionIds = sessions.map(session => session._id);

    // Find all QR sessions for these sessions
    const qrSessions = await QrSession.find({ session: { $in: sessionIds } }).populate('session');

    // Find all attendance records for this student
    const attendance = await Attendance.find({ student: studentId });
    const attendedSessionIds = attendance.map(att => att.session.toString());

    // Format the results
    const response = qrSessions.map(qr => ({
      qrCode: qr.code,
      sessionTitle: qr.session.title,
      sessionId: qr.session._id,
      expiresAt: qr.expiresAt,
      createdAt: qr.createdAt,
      attended: attendedSessionIds.includes(qr.session._id.toString()),
    }));

    res.json({ sessions: response });
  } catch (error) {
    console.error('Error fetching QR session status:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
