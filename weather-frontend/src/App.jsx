import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherChart from './components/WeatherChart';
import CitySelector from './components/CitySelector';
import './styles/index.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('Delhi');

  return (
    <div className="container">
      <h1>Weather Monitoring System</h1>
      <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
      <div className="dashboard">
        <WeatherCard city={selectedCity} />
        <WeatherChart city={selectedCity} />
      </div>
    </div>
  );
}

export default App;

