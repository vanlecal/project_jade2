const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2, process.env.CORS_ORIGIN_3],
    credentials: true,
  },
});

app.set('io', io);

connectDB();
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/lecturer', require('./routes/lecturerRoutes'));

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join_class', (programCode) => {
    socket.join(programCode);
    console.log(`Student joined class room: ${programCode}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
