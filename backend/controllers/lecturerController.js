const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/lecturerModel');
const QrSession = require('../models/QrSession');
const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");

exports.registerUser = async (req, res) => {
    try {
      const { name, sex, phone, email, password } = req.body;
      console.log(req.body);
  
      if (!name || !sex || !phone || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, sex, phone, email, password: hashedPassword, role: 'lecturer' });
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


exports.getlecturerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch user error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};





exports.generateQrSession = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'QR session title required' });

    // 1. Find or create a logical session
    let session = await Session.findOne({ title, lecturer: req.userId });

    if (!session) {
      session = await Session.create({
        title,
        lecturer: req.userId,
      });
    }

    // 2. Generate QR code for the session
    const code = uuidv4();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    const qrSession = await QrSession.create({
      code,
      session: session._id,  // Link to the logical session
      expiresAt,
    });

    res.status(201).json({ code, expiresAt, title, sessionId: session._id });
  } catch (error) {
    console.error('QR generation error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.getLecturerSessions = async (req, res) => {
  try {
    const lecturerId = req.userId;
    const sessions = await Session.find({ lecturer: lecturerId }).sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (err) {
    console.error('Get sessions error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const attendance = await Attendance.find({ session: sessionId })  // session, not qrSession
      .populate({
        path: 'student',
        select: '-password',
      })
      .sort({ scannedAt: -1 });

    res.status(200).json(attendance);
  } catch (err) {
    console.error('Get attendance error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



// Delete A Session
exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const lecturerId = req.userId;

    // Ensure the session belongs to the lecturer
    const session = await Session.findOne({ _id: sessionId, lecturer: lecturerId });
    if (!session) return res.status(404).json({ message: 'Session not found or unauthorized' });

    // Find related QR sessions
    const qrSessions = await QrSession.find({ session: sessionId });
    const qrSessionIds = qrSessions.map(qr => qr._id);

    // Delete all related attendance records
    await Attendance.deleteMany({ session: sessionId });

    // Delete QR sessions
    await QrSession.deleteMany({ session: sessionId });

    // Delete the session itself
    await session.deleteOne();

    res.status(200).json({ message: 'Session and related data deleted successfully' });
  } catch (err) {
    console.error('Delete session error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
