const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow CORS (important for frontend to connect!)
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for now in dev mode)
  }
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for incoming chat messages
  socket.on("chat_message", (message) => {
    console.log("Received message:", message);

    // Broadcast the message to everyone (including sender)
    io.emit("chat_message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
