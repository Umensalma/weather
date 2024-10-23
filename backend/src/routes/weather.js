
const express = require('express');
const router = express.Router();
const WeatherData = require('../models/WeatherData');
const { fetchWeatherData } = require('../services/weatherService');

router.get('/:city', async (req, res) => {
  try {
    const data = await fetchWeatherData(req.params.city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/summary/:city', async (req, res) => {
  try {
    const data = await WeatherData.find({ city: req.params.city })
      .sort({ timestamp: -1 })
      .limit(24);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;