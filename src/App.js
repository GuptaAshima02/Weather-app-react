import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Jammu');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timer;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setShowError(false);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dda26109be2e21c827819fa96320454e&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setShowError(true);
        timer = setTimeout(() => {
          setError('Invalid location. Please enter a valid location.');
        }, 500);
      }

      setIsLoading(false);
    };

    if (location.trim() !== '') {
      fetchData();
    }

    return () => {
      clearTimeout(timer);
    };
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
      {location.trim() === '' ? (
        <p className="error">Please enter a location.</p>
      ) : isLoading ? (
        <div className="loader"></div>
      ) : showError ? (
        <p className="error">{error}</p>
      ) : weatherData ? (
        <div className="info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherApp;
