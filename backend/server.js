const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(cors({
    origin: [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2, process.env.CORS_ORIGIN_3],
    credentials: true,
}));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/lecturer', require('./routes/lecturerRoutes'));
// app.use('/api/attendance', require('./routes/attendanceRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
