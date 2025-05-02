const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const protectStudent = require('../middleware/authMiddleware');

// Debug: Verify controller functions exist
console.log('Student Controller Functions:', {
  registerUser: typeof studentController.registerUser,
  loginUser: typeof studentController.loginUser,
  getStudentProfile: typeof studentController.getStudentProfile
});

router.post('/register', studentController.registerUser);
router.post('/login', studentController.loginUser);
router.get('/me', protect, studentController.getStudentProfile);
router.post('/attendance/scan', protectStudent, studentController.recordAttendance);
router.get('/attendance/history', protectStudent, studentController.getAttendanceHistory);
router.get('/my-qr-sessions', protectStudent, studentController.getStudentQrSessionsStatus);

module.exports = router;
