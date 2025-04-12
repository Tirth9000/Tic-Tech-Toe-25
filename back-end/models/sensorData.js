const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { _id: false }); // Disable _id for subdocuments if not needed

const SensorSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  readings: {
    type: [ReadingSchema],
    default: []
  },
  unit: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);
