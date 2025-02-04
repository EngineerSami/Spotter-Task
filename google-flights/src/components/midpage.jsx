import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/midpage.css";

const MidPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [tripType, setTripType] = useState("Round trip");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const fetchAirportSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
        {
          params: { query, locale: "en-US" },
          headers: {
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
            "x-rapidapi-key": "95b193bd28msh6971b2a7b2a67fcp103c30jsn3f8defe1cbc5",
          },
        }
      );
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching airport suggestions:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchAirportSuggestions(from, setFromSuggestions), 0);
    return () => clearTimeout(timer);
  }, [from]);

  useEffect(() => {
    const timer = setTimeout(() => fetchAirportSuggestions(to, setToSuggestions), 0);
    return () => clearTimeout(timer);
  }, [to]);

  return (
    <>
      <div className="container">
        <img
          className="background-image"
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
          alt="Background"
        />
        <div className="titlee">Flights</div>
      </div>

      <div className="search-container" onClick={() => setOpenDropdown(null)}>
        <div style={{ display: "flex" }}>
          <div className="dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown(openDropdown === "trip" ? null : "trip");
              }}
            >
              <i className="fas fa-exchange-alt"></i> {tripType}{" "}
              <i className="fas fa-caret-down"></i>
            </button>
            {openDropdown === "trip" && (
              <div className="dropdown-content">
                {["Round trip", "One way", "Multi-city"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTripType(type);
                      setOpenDropdown(null);
                      if (type === "One way") setReturnDate("");
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="search-options">
          <div className="search-option">
            <i className="fas fa-map-marker-alt"></i>
            <input
              type="text"
              placeholder="Where from?"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            {fromSuggestions.length > 0 && (
              <ul className="suggestions">
                {fromSuggestions.map((airport) => (
                  <li
                    key={airport.entityId}
                    onClick={() => {
                      setFrom(airport.presentation.title);
                      setFromSuggestions([]);
                    }}
                  >
                    {airport.presentation.title} ({airport.skyId})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-option">
            <i className="fas fa-map-marker-alt"></i>
            <input
              type="text"
              placeholder="Where to?"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            {toSuggestions.length > 0 && (
              <ul className="suggestions">
                {toSuggestions.map((airport) => (
                  <li
                    key={airport.entityId}
                    onClick={() => {
                      setTo(airport.presentation.title);
                      setToSuggestions([]);
                    }}
                  >
                    {airport.presentation.title} ({airport.skyId})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-option">
            <i className="fas fa-calendar-alt"></i>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={today}
            />
          </div>

          {tripType !== "One way" && (
            <div className="search-option">
              <i className="fas fa-calendar-alt"></i>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate || today}
              />
            </div>
          )}
        </div>
      </div>

      <button className="explore-button">
        <i className="fas fa-search"></i>
        <span>Explore</span>
      </button>
    </>
  );
};

export default MidPage;
