
const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  main: {
    type: String,
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
  feels_like: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('WeatherData', weatherDataSchema);