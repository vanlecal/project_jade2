import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL as string;

//Checking for API_URI variable
if (!API_URL) {
  throw new Error("VITE_API_URL is not defined in the environment variables.");
}

const socket = io(`${API_URL}`, {
  withCredentials: true,
});

export default socket;