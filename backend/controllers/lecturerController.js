const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/lecturerModel');
const StudentUser = require('../models/studentModel');
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


// exports.generateQrSession = async (req, res) => {
//   try {
//     const { title, program } = req.body;
//     if (!title || !program)
//       return res.status(400).json({ message: 'QR session title and program are required' });

//     // 1. Find or create a logical session
//     let session = await Session.findOne({ title, lecturer: req.userId, program });

//     if (!session) {
//       session = await Session.create({
//         title,
//         lecturer: req.userId,
//         program,
//       });
//     }

//     // 2. Generate QR code for the session
//     const code = uuidv4();
//     const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

//     const qrSession = await QrSession.create({
//       code,
//       session: session._id,
//       expiresAt,
//     });

//     res.status(201).json({ code, expiresAt, title, program, sessionId: session._id });
//   } catch (error) {
//     console.error('QR generation error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.generateQrSession = async (req, res) => {
  try {
    const { title, program } = req.body;
    if (!title || !program)
      return res.status(400).json({ message: 'QR session title and program are required' });

    let session = await Session.findOne({ title, lecturer: req.userId, program });

    if (!session) {
      session = await Session.create({
        title,
        lecturer: req.userId,
        program,
      });
    }

    const code = uuidv4();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    const qrSession = await QrSession.create({
      code,
      session: session._id,
      expiresAt,
    });

    // 👉 Emit an alert to the specific class/program
    const io = req.app.get('io');
    io.to(program).emit('attendance_opened', {
      message: `Attendance session "${title}" is now open for program ${program}`,
      code,
      expiresAt,
      program,
    });

    res.status(201).json({ code, expiresAt, title, program, sessionId: session._id });
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


// For just one Session
exports.getAbsentStudentsForQrSession = async (req, res) => {
  try {
    const { qrSessionId } = req.params;

    if (!qrSessionId) {
      return res.status(400).json({ message: 'QR session ID is required' });
    }

    // 1. Get the QR session and populate the session it belongs to
    const qrSession = await QrSession.findById(qrSessionId).populate('session');
    if (!qrSession) {
      return res.status(404).json({ message: 'QR session not found' });
    }

    // 2. Get the session (which has the program and lecturer info)
    const session = qrSession.session;
    const program = session.program;
    const lecturerId = session.lecturer.toString();

    // Optional: Ensure the requesting lecturer matches the session's lecturer
    if (req.userId !== lecturerId) {
      return res.status(403).json({ message: 'Unauthorized access to this session' });
    }

    // 3. Find all students in that program
    const allProgramStudents = await Student.find({ program });

    // 4. Get attendance records for this specific QR session
    const presentAttendance = await Attendance.find({ qrSession: qrSession._id });

    const presentStudentIds = presentAttendance.map(a => a.student.toString());

    // 5. Filter students who are not in the attendance list
    const absentStudents = allProgramStudents
      .filter(student => !presentStudentIds.includes(student._id.toString()))
      .map(student => ({
        name: student.name,
        indexNumber: student.indexNumber,
        program: student.program,
        missedSessionTitle: session.title,
      }));

    res.json({
      qrSessionId,
      sessionTitle: session.title,
      program,
      absentees: absentStudents,
      totalAbsent: absentStudents.length,
    });

  } catch (error) {
    console.error('Error fetching absent students:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all Opend sessions for students in a program

// exports.mapStudentToSessions = async (req, res) => {
//   try {
//     const lecturerId = req.userId;

//     // 1. Get all sessions created by this lecturer
//     const sessions = await Session.find({ lecturer: lecturerId });

//     const absenteesMap = new Map();

//     // 2. Loop through each session
//     for (const session of sessions) {
//       const program = session.program;
//       const sessionTitle = session.title;

//       // 3. Find all QR sessions under this session
//       const qrSessions = await QrSession.find({ session: session._id });

//       for (const qr of qrSessions) {
//         const date = qr.createdAt || qr.date;

//         // 4. Get students in the program
//         const studentList = await StudentUser.find({ program });

//         // 5. Get present students for this QR session
//         const presentAttendance = await Attendance.find({ qrSession: qr._id });
//         const presentStudentIds = presentAttendance.map(a => a.student.toString());

//         // 6. Identify absentees
//         for (const student of studentList) {
//           if (!presentStudentIds.includes(student._id.toString())) {
//             const key = student._id.toString();

//             if (!absenteesMap.has(key)) {
//               absenteesMap.set(key, {
//                 student: {
//                   name: student.name,
//                   indexNumber: student.index,
//                   program: student.program
//                 },
//                 missedSessions: []
//               });
//             }

//             absenteesMap.get(key).missedSessions.push({
//               title: sessionTitle,
//               date: date?.toISOString().split('T')[0] || "Unknown"
//             });
//           }
//         }
//       }
//     }

//     const absenteesList = Array.from(absenteesMap.values());

//     res.json({
//       lecturerId,
//       absentees: absenteesList,
//       totalStudentsWithAbsences: absenteesList.length
//     });

//   } catch (err) {
//     console.error("Error getting absentees by lecturer:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// Get Absentees by Lecturer

// exports.getAbsenteesByLecturer = async (req, res) => {
//   try {
//     const lecturerId = req.userId;

//     // Step 1: Find all sessions by this lecturer
//     const sessions = await Session.find({ lecturer: lecturerId });

//     const programSessionMap = {};
//     for (const session of sessions) {
//       if (!programSessionMap[session.program]) {
//         programSessionMap[session.program] = [];
//       }
//       programSessionMap[session.program].push(session);
//     }

//     const absenteesMap = {};

//     // Step 2: Loop through each session and find students in the same program who missed it
//     for (const session of sessions) {
//       const studentsInProgram = await StudentUser.find({ program: session.program });

//       for (const student of studentsInProgram) {
//         const attended = await Attendance.findOne({
//           student: student._id,
//           session: session._id,
//         });

//         if (!attended) {
//           if (!absenteesMap[student._id]) {
//             absenteesMap[student._id] = {
//               student: {
//                 name: student.name,
//                 indexNumber: student.index,
//                 program: student.program,
//               },
//               missedSessions: [],
//             };
//           }

//           absenteesMap[student._id].missedSessions.push({
//             title: session.title,
//             date: session.createdAt,
//           });
//         }
//       }
//     }

//     const absentees = Object.values(absenteesMap);

//     res.status(200).json({ absentees });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch absentees.' });
//   }
// };









exports.getAbsenteesByLecturer = async (req, res) => {
  try {
    const lecturerId = req.userId;

    // Step 1: Get all sessions created by this lecturer
    const sessions = await Session.find({ lecturer: lecturerId });

    if (!sessions.length) {
      return res.status(200).json({ absentees: [] });
    }

    const sessionIds = sessions.map(s => s._id.toString());

    // Step 2: Map sessions to programs
    const programToSessions = {};
    for (const session of sessions) {
      if (!programToSessions[session.program]) {
        programToSessions[session.program] = [];
      }
      programToSessions[session.program].push({
        _id: session._id,
        title: session.title,
        createdAt: session.createdAt,
      });
    }

    const absentees = [];

    // Step 3: For each program, find students and sessions they missed
    for (const [program, programSessions] of Object.entries(programToSessions)) {
      const students = await StudentUser.find({ program });

      const studentIds = students.map(s => s._id);

      // Step 4: Get all attendance for students in this program and sessions by this lecturer
      const attendanceRecords = await Attendance.find({
        student: { $in: studentIds },
        session: { $in: programSessions.map(s => s._id) },
      });

      // Create a map of studentId -> Set of attended sessionIds
      const attendanceMap = {};
      for (const record of attendanceRecords) {
        const sid = record.student.toString();
        const sess = record.session.toString();
        if (!attendanceMap[sid]) attendanceMap[sid] = new Set();
        attendanceMap[sid].add(sess);
      }

      for (const student of students) {
        const attendedSessions = attendanceMap[student._id.toString()] || new Set();
        const missedSessions = programSessions.filter(
          sess => !attendedSessions.has(sess._id.toString())
        );

        if (missedSessions.length > 0) {
          absentees.push({
            student: {
              name: student.name,
              indexNumber: student.index,
              program: student.program,
            },
            missedSessions: missedSessions.map(s => ({
              title: s.title,
              date: s.createdAt,
            })),
          });
        }
      }
    }

    res.status(200).json({ absentees });
  } catch (error) {
    console.error('Error fetching absentees:', error);
    res.status(500).json({ message: 'Failed to fetch absentees.' });
  }
};





exports.getLecturerDashboardStats = async (req, res) => {
  try {
    const lecturerId = req.userId;

    const totalSessions = await Session.countDocuments({ lecturer: lecturerId });

    const sessions = await Session.find({ lecturer: lecturerId }).select('program');
    const programIds = [...new Set(sessions.map(s => s.program))];

    const totalStudents = await StudentUser.countDocuments({ program: { $in: programIds } });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysSessions = await Session.find({
      lecturer: lecturerId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const todaysSessionsCount = todaysSessions.length;
    const todaysSessionIds = todaysSessions.map(s => s._id);

    const attendedStudentIds = await Attendance.find({
      session: { $in: todaysSessionIds },
    }).distinct('student');

    const expectedStudentCount = await StudentUser.countDocuments({
      program: { $in: programIds },
    });

    const absentCount = Math.max(expectedStudentCount - attendedStudentIds.length, 0);

    res.json({
      totalSessions,
      totalStudents,
      todaysSessions: todaysSessionsCount,
      absentStudents: absentCount,
    });
  } catch (error) {
    console.error('Lecturer dashboard stats error:', error.message);
    res.status(500).json({ message: 'Failed to fetch dashboard statistics' });
  }
};