const express = require('express');
const { registerUser, loginUser, getlecturerProfile, generateQrSession, getLecturerSessions, getSessionAttendance, deleteSession, getAbsentStudentsForQrSession, getAbsenteesByLecturer, getLecturerDashboardStats } = require('../controllers/lecturerController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const protectLecturer = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getlecturerProfile);

router.post('/generate', protectLecturer, generateQrSession);

router.get('/sessions', protectLecturer, getLecturerSessions);
router.get('/attendance/:sessionId', protectLecturer, getSessionAttendance);
router.delete('/sessions/:sessionId', protectLecturer, deleteSession);
router.get('/attendance/absentees/by-lecturer', protectLecturer, getAbsenteesByLecturer);
router.get('/attendance/absent/:qrSessionId', protectLecturer, getAbsentStudentsForQrSession);
router.get('/dashboard-stats', protectLecturer, getLecturerDashboardStats);

module.exports = router;
