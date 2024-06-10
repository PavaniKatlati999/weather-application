import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import CityList from "./components/CityList";
import SearchPanel from "./components/SearchPanel";
import WeeklyReportModal from "./Modals/WeeklyReportModal";
import "./styles/Weather.css";

const App = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState([]);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (response.data && response.data.current_weather) {
        toast.success("City added successfully!");
        return response.data.current_weather;
      } else {
        toast.error("Invalid weather data format:", response.data);
        return null;
      }
    } catch (error) {
      toast.error("Error fetching weather data:", error);
      return null;
    }
  };

  // Fetch search results based on query
  const fetchSearchResults = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`
      );

      if (response.data && Array.isArray(response.data.results)) {
        setSearchResults(response.data.results);
      } else {
        toast.error("Invalid search results format:", response.data);
        setSearchResults([]);
      }
    } catch (error) {
      toast.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  // Add city to the dashboard
  const addCity = async (city) => {
    const { latitude, longitude } = city;
    const weatherData = await fetchWeatherData(latitude, longitude);
    if (weatherData) {
      const cityName = city.name;
      const newCity = {
        ...weatherData,
        latitude,
        longitude,
        name: cityName,
        id: uuidv4(),
      };

      setCities([...cities, newCity]);
      setShowModal(false);
      setSearchQuery("");
    }
  };

  // Remove city from the dashboard
  const removeCity = (index) => {
    const updatedCities = [...cities];
    updatedCities.splice(index, 1);
    setCities(updatedCities);
    toast.error("City removed!!!");
  };

  // Handle search query change
  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  // Function to handle city reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(cities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCities(items);
  };

  const showWeeklyReport = async (city) => {
    const { latitude, longitude } = city;
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset,rain_sum`
      );
      setWeeklyReport(response.data.daily);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching weekly report:", error);
      return null;
    }
  };

  return (
    <div className="weather-tracker">
      <ToastContainer autoClose={1000} />
      <Header setShowModal={setShowModal} />
      <div className="content">
        <CityList
          cities={cities}
          removeCity={removeCity}
          showWeeklyReport={showWeeklyReport}
        />
        <SearchPanel
          showModal={showModal}
          setSearchQuery={setSearchQuery}
          fetchSearchResults={fetchSearchResults}
          searchResults={searchResults}
          addCity={addCity}
        />
      </div>
      {modalOpen && (
        <WeeklyReportModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={weeklyReport}
        />
      )}
    </div>
  );
};

export default App;
