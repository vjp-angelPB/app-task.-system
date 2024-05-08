import React, { useState, useEffect } from "react";
import { getWeather } from "../../api";
import SunIcon from "./WeatherIcons/SunIcon";
import RainIcon from "./WeatherIcons/RainIcon";
import NightIcon from "./WeatherIcons/NightIcon";
import ColdIcon from "./WeatherIcons/ColdIcon";
import CloudyIcon from "./WeatherIcons/Cloudy";
import RainWithSunIcon from "./WeatherIcons/RainWithSunIcon";
import SnowWithSunIcon from "./WeatherIcons/SnowWithSunIcon";
import WindyWithSunIcon from "./WeatherIcons/WindyWithSunIcon";
import CloudyWithColdIcon from "./WeatherIcons/CloudyWithColdIcon";
import SunWithCloudyIcon from "./WeatherIcons/SunWithCloudyIcon";
import backgroundImage from "./img/backgroundImage.jpg";
import Cloudy from "./img/Cloudy.gif";
import CloudyWithCold from "./img/CloudyWithCold.gif";
import Cold from "./img/Cold.gif";
import Night from "./img/Night.gif";
import Rain from "./img/Rain.gif";
import RainWithSun from "./img/RainWithSun.gif";
import SnowWithSun from "./img/SnowWithSun.gif";
import Sun from "./img/Sun.gif";
import SunWithCloudy from "./img/SunWithCloudy.gif";
import WindyWithSun from "./img/WindyWithSun.gif";
import moment from "moment-timezone";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [timezone, setTimezone] = useState("");
  const [url, setUrl] = useState(backgroundImage);

  let currentHour;
  if (timezone) {
    currentHour = moment().tz(timezone).hours();
  } else {
    currentHour = new Date().getHours();
  }

  useEffect(() => {
    const getWeatherBackgroundUrl = async () => {
      if (weather && Object.keys(weather).length !== 0) {
        let newUrl;
        if (currentHour >= 6 && currentHour < 20) {
          // Day
          if (weather.sunshine_duration > 0 && weather.cloud_cover > 40 && weather.precipitation > 0.2) {
            newUrl = RainWithSun;
          } else if (weather.temperature_2m <= 3 && weather.sunshine_duration > 0 && weather.precipitation > 0.2) {
            newUrl = SnowWithSun;
          } else if (weather.wind_speed_10m > 23 && weather.sunshine_duration > 0) {
            newUrl = WindyWithSun;
          } else if (weather.cloud_cover > 40 && weather.temperature_2m < 10 && weather.precipitation >= 0.3) {
            newUrl = CloudyWithCold;
          } else if (weather.sunshine_duration > 10 && weather.cloud_cover >= 40) {
            newUrl = SunWithCloudy;
          } else if (weather.sunshine_duration > 0 && weather.cloud_cover === 0 && weather.precipitation < 0) {
            newUrl = Sun;
          } else if (weather.precipitation > 0 && weather.cloud_cover >= 30) {
            newUrl = Rain;
          } else if (weather.cloud_cover > 30) {
            newUrl = Cloudy;
          } else if (weather.temperature_2m < 10) {
            newUrl = Cold;
          } else {
            newUrl = Sun;
          }
        } else {
          // Night
          newUrl = Night;
        }
        setUrl(newUrl);
      }
    };
    getWeatherBackgroundUrl();
  }, [weather, currentHour]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async (city) => {
    const data = await getWeather(city);
    setTimezone(data.timezone);
    setWeather(data.current);
    if (data.latitude === 40.6875 && data.longitude === -7.9375) {
      setCity("Viseu");
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (city !== "") {
      fetchWeatherData(city);
    } else {
      fetchWeatherData("Viseu");
    }
  };

  const getWeatherIcon = (weather, time) => {
    const iconStyle = { width: "200px", height: "200px" };

    if (time >= 6 && time < 20) {
      // Day
      if (weather.sunshine_duration > 0 && weather.cloud_cover > 40 && weather.precipitation > 0.2) {
        return <RainWithSunIcon style={iconStyle} />;
      } else if (weather.temperature_2m <= 3 && weather.sunshine_duration > 0 && weather.precipitation > 0.2) {
        return <SnowWithSunIcon style={iconStyle} />;
      } else if (weather.wind_speed_10m > 23 && weather.sunshine_duration > 0) {
        return <WindyWithSunIcon style={iconStyle} />;
      } else if (weather.cloud_cover > 40 && weather.temperature_2m < 10 && weather.precipitation >= 0.3) {
        return <CloudyWithColdIcon style={iconStyle} />;
      } else if (weather.sunshine_duration > 10 && weather.cloud_cover >= 40) {
        return <SunWithCloudyIcon style={iconStyle} />;
      } else if (weather.sunshine_duration > 0 && weather.cloud_cover === 0 && weather.precipitation < 0) {
        return <SunIcon style={iconStyle} />;
      } else if (weather.precipitation > 0 && weather.cloud_cover >= 30) {
        return <RainIcon style={iconStyle} />;
      } else if (weather.cloud_cover > 30) {
        return <CloudyIcon style={iconStyle} />;
      } else if (weather.temperature_2m < 10) {
        return <ColdIcon style={iconStyle} />;
      } else {
        return <SunIcon style={iconStyle} />;
      }
    } else {
      // Night
      return <NightIcon style={iconStyle} />;
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundBlendMode: "overlay", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>

      <form onSubmit={handleSearchSubmit} style={{ marginTop: "10px", display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', maxWidth: '300px' }}>

        <input type="text" value={city} onChange={handleCityChange} placeholder="Search city" style={{ fontSize: "1.5rem", padding: "10px", border: "1px solid black", borderRadius: "4px", marginBottom: '10px' }} />
        <button type="submit" style={{ fontSize: "1.5rem", padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "30px", marginTop: "5px", cursor: "pointer", transitionDuration: "0.4s" }}
          onMouseOver={(e) => { e.target.style.backgroundColor = "#45a049"; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = "#4CAF50"; }}>Search</button>
      </form>

      <h1 style={{ marginTop: "10px", fontSize: "4rem" }}>{city}</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: "3px solid black", padding: "10px", marginBottom: "20px", width: "90%", maxWidth: "400px", height: "auto", boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.5)", backgroundColor: 'white' }} >
        <div>{getWeatherIcon(weather, currentHour)} </div>

        <p style={{ fontSize: "1.5rem", marginTop: "20px" }}> Temperature: {weather.temperature_2m} °C </p>
        <p style={{ fontSize: "1.5rem", marginTop: "10px" }}> Humidity: {weather.relative_humidity_2m} % </p>
        <p style={{ fontSize: "1.5rem", marginTop: "10px" }}> Precipitation: {weather.precipitation} mm </p>
        <p style={{ fontSize: "1.5rem", marginTop: "10px" }}> Wind Speed: {weather.wind_speed_10m} km/h </p>
        <p style={{ fontSize: "1.5rem", marginTop: "10px" }}> Cloud Cover: {weather.cloud_cover} % </p>
      </div>
    </div>
  );
};

export default Weather;
