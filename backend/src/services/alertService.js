const nodemailer = require('nodemailer');

const alertThresholds = {
  highTemp: 35,
  consecutiveChecks: 2,
};

const tempHistory = new Map();

async function checkAlerts(weatherData) {
  const { city, temp } = weatherData;
  
  if (!tempHistory.has(city)) {
    tempHistory.set(city, []);
  }
  
  const cityHistory = tempHistory.get(city);
  cityHistory.push(temp);
  
  if (cityHistory.length > alertThresholds.consecutiveChecks) {
    cityHistory.shift();
  }
  
  if (cityHistory.length === alertThresholds.consecutiveChecks &&
      cityHistory.every(t => t > alertThresholds.highTemp)) {
    await sendAlert(city, temp);
  }
}

async function sendAlert(city, temp) {
  // Configure email transport here
  console.log(`ALERT: High temperature in ${city}: ${temp}°C`);
}

module.exports = { checkAlerts };
