import { io } from "socket.io-client";

const socket = io("https://project-jade-1.onrender.com", {
  withCredentials: true,
});

export default socket;