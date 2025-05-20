// import { io } from "socket.io-client";

// // Connect to backend
// const socket = io("http://localhost:5000");

// export default socket;




import { io } from "socket.io-client";

const socket = io("https://project-jade-1.onrender.com", {
  withCredentials: true,
});

export default socket;