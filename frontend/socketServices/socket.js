import { io } from "socket.io-client";

// export const socket = io("http://localhost:5000");
// export const socket = io(import.meta.env.VITE_API_URL, {
//   withCredentials: true,
// });

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
});