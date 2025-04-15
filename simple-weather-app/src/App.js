import React, { useState } from 'react';
import axios from 'axios';
import { 
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, 
  WiFog, WiDayCloudy, WiNightClear, WiHumidity, WiStrongWind 
} from 'react-icons/wi';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c';

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm size={60} />;
    if (weatherId >= 300 && weatherId < 400) return <WiRain size={60} />;
    if (weatherId >= 500 && weatherId < 600) return <WiRain size={60} />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow size={60} />;
    if (weatherId >= 700 && weatherId < 800) return <WiFog size={60} />;
    if (weatherId === 800) return <WiDaySunny size={60} />;
    if (weatherId > 800) return <WiCloudy size={60} />;
    return <WiDaySunny size={60} />;
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      alert('City not found!');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {weather && (
        <div className="weather-card">
          <div className="location">
            <h2>{weather.name}, {weather.sys.country}</h2>
          </div>
          
          <div className="weather-main">
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].id)}
            </div>
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
          </div>
          
          <div className="description">{weather.weather[0].description}</div>
          
          <div className="weather-details">
            <div className="detail-item">
              <WiHumidity size={30} />
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <WiStrongWind size={30} />
              <span>{weather.wind.speed} m/s</span>
            </div>
            <div className="detail-item">
              <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;