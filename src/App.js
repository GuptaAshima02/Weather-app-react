import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import img from './weather-img.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, []);

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
      setError('Invalid location. Please enter a valid location.');
    }

    setIsLoading(false);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setSearchClicked(false);

    // Check if the entered value is a number
    setIsButtonDisabled(!isNaN(value));
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
    fetchData();
  };

  return (
    <div className="container background-image">
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <div className="input-and-button">
        <input
          type="text"
          className="input"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <button onClick={handleSearchClick} disabled={isButtonDisabled}>
          Search
        </button>
      </div>
      {searchClicked && isLoading ? (
        <div className="loader info"></div>
      ) : showError ? (
        <p className="error info">{error}</p>
      ) : weatherData ? (
        <div className="info">
          <div className="image">
            <img src={img} alt="React image" />
          </div>
          <h2>{weatherData.name}</h2>
          <p>
            <FontAwesomeIcon icon={faTemperatureHigh} className="info-icon" />
            Temperature: {weatherData.main.temp}°C
          </p>
          <p>
            <FontAwesomeIcon icon={faTint} className="info-icon" />
            Humidity: {weatherData.main.humidity}%
          </p>
          <p>
            <FontAwesomeIcon icon={faWind} className="info-icon" />
            Wind Speed: {weatherData.wind.speed} m/s
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherApp;
