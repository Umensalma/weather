const axios = require('axios');
const WeatherData = require('../models/WeatherData');
const DailySummary = require('../models/DailySummary');
const { checkAlerts } = require('./alertService');

const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const API_KEY = process.env.OPENWEATHER_API_KEY;

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}`;
  const response = await axios.get(url);
  
  return {
    city,
    main: response.data.weather[0].main,
    temp: response.data.main.temp - 273.15, // Convert to Celsius
    feels_like: response.data.main.feels_like - 273.15,
  };
}

async function updateDailySummary(city) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weatherData = await WeatherData.find({
    city,
    timestamp: { $gte: today }
  });
  
  if (weatherData.length === 0) return;
  
  const temps = weatherData.map(w => w.temp);
  const weatherCounts = new Map();
  weatherData.forEach(w => {
    weatherCounts.set(w.main, (weatherCounts.get(w.main) || 0) + 1);
  });
  
  const dominantWeather = [...weatherCounts.entries()]
    .reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  await DailySummary.findOneAndUpdate(
    { city, date: today },
    {
      avgTemp: temps.reduce((a, b) => a + b) / temps.length,
      maxTemp: Math.max(...temps),
      minTemp: Math.min(...temps),
      dominantWeather,
      weatherCounts,
    },
    { upsert: true }
  );
}

async function scheduleWeatherUpdates() {
  setInterval(async () => {
    for (const city of CITIES) {
      try {
        const weatherData = await fetchWeatherData(city);
        await WeatherData.create(weatherData);
        await updateDailySummary(city);
        await checkAlerts(weatherData);
      } catch (error) {
        console.error(`Error updating weather for ${city}:`, error);
      }
    }
  }, 5 * 60 * 1000); // Every 5 minutes
}

module.exports = { scheduleWeatherUpdates };