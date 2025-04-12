// client.js
import { io } from "socket.io-client";

// Connect to server (default port 3000, or change as needed)
const socket = { instance: null }

const useIO = () => {
    if (socket.instance) return socket.instance

    socket.instance = io("http://localhost:5600")
    // When connected
    socket.on("connect", () => {
        console.log("Connected to server with ID:", socket.id);

        // Emit an event to the server
        socket.emit("message", "Hello from client!");
    });

    // Listen for a response from server
    socket.on("serverMessage", (data) => {
        console.log("Message from server:", data);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
    return socket.instance;
}

export { useIO }