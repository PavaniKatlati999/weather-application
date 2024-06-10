import React from "react";
import "../styles/WeeklyReportModal.css";

const WeeklyReportModal = ({ isOpen, onClose, data }) => {
  const extractTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {data && (
          <table>
            <thead>
              <tr>
                <th></th>
                {data.time.map((date, index) => (
                  <th key={index}>{formatDate(date)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sunrise</td>
                {data.sunrise.map((time, index) => (
                  <td key={index}>{extractTime(time)}</td>
                ))}
              </tr>
              <tr>
                <td>Sunset</td>
                {data.sunset.map((time, index) => (
                  <td key={index}>{extractTime(time)}</td>
                ))}
              </tr>
              <tr>
                <td>Max Temp</td>
                {data.temperature_2m_max.map((temp, index) => (
                  <td key={index}>{temp} °C</td>
                ))}
              </tr>
              <tr>
                <td>Min Temp</td>
                {data.temperature_2m_min.map((temp, index) => (
                  <td key={index}>{temp} °C</td>
                ))}
              </tr>
              <tr>
                <td>Rain</td>
                {data.rain_sum.map((sum, index) => (
                  <td key={index}>{sum} mm</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WeeklyReportModal;
