// server.js
require('dotenv').config();

const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');
const connectDB = require('./database/db.connection');
const { pushDataEventHandler, predictFailureRate, askAI, addSensor } = require('./controllers/sensor.controller');


// Create Express app
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to your frontend origin in production
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());

// Basic route
app.get('/health-check', (req, res) => {
  res.send('Server is up and running!');
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Received message:', data);
    socket.broadcast.emit('message', data);
  });
  // SETTING UP ALL THE HANDLERS FOR THE SENSOR MODULES
  socket.on('sensor_push',(data)=>pushDataEventHandler(socket, data));
  socket.on('sensor_predict_failure_rate',(data)=>predictFailureRate(socket, data));
  socket.on('ask_ai',(data)=>askAI(socket, data));
  socket.on('add_sensor', (data)=>addSensor(socket,data))

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
