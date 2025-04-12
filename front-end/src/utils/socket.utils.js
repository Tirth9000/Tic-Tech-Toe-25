// client.js
import { io } from "socket.io-client";

const socket = { instance: null };

const useIO = () => {
  if (socket.instance) return socket.instance;

  socket.instance = io("http://localhost:5900", {
    withCredentials: true,
    transports: ["websocket"], // optional: skip polling for speed
  });

  socket.instance.on("connect", () => {
    console.log("✅ Connected to server with ID:", socket.instance.id);
    socket.instance.emit("message", "Hello from client!");
  });

  socket.instance.on("disconnect", (reason) => {
    console.warn("⚠️ Disconnected from server:", reason);
  });

  socket.instance.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
  });

  return socket.instance;
};

export { useIO };
