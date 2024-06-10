import React, { useState } from "react";

const City = ({ city, index, removeCity, showWeeklyReport }) => {
  const [unitSystem, setUnitSystem] = useState("metric");

  // Function to format temperature with units
  const formatTemperature = (temperature) => {
    return unitSystem === "metric" ? `${temperature} °C` : `${temperature} °F`;
  };

  // Function to format wind speed with units
  const formatWindSpeed = (windspeed) => {
    return unitSystem === "metric" ? `${windspeed} km/h` : `${windspeed} mph`;
  };

  // Function to format wind direction with units
  const formatWindDirection = (winddirection) => {
    return unitSystem === "metric"
      ? `${winddirection} °`
      : `${winddirection} °`;
  };

  return (
    <div className="city">
      <div className="react-beautiful-dnd-drag-handle">
        <h2>{city.name}</h2>
      </div>
      <div className="weather-info" onClick={() => showWeeklyReport(city)}>
        <div className="city-name"></div>
        <div className="weather-details">
          <p>Temperature: {formatTemperature(city.temperature)}</p>
          <p>Wind Speed: {formatWindSpeed(city.windspeed)}</p>
          <p>Precipitation: {formatWindDirection(city.winddirection)}</p>
        </div>
      </div>
      <button onClick={() => removeCity(index)}>X</button>
    </div>
  );
};

export default City;
