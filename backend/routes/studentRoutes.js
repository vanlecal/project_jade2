const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const protectStudent = require('../middleware/authMiddleware');


router.post('/register', studentController.registerUser);
router.post('/login', studentController.loginUser);
router.get('/me', protect, studentController.getStudentProfile);
router.post('/attendance/scan', protectStudent, studentController.recordAttendance);
router.get('/attendance/history', protectStudent, studentController.getAttendanceHistory);
router.get('/my-qr-sessions', protectStudent, studentController.getStudentQrSessionsStatus);

module.exports = router;
