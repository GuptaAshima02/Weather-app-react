import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// import backgroundImage from './pexels-johannes-plenio-1118873.jpg'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Jammu');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dda26109be2e21c827819fa96320454e&units=metric`
      );
      setWeatherData(response.data);
    };
    fetchData();
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="container background-image">
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <input
        type="text"
        className="input"
        value={location}
        onChange={handleLocationChange}
      />
      {weatherData ? (
        <div className="info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherApp;
