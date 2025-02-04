import React, { useState, useEffect } from 'react';
import "../styles/searchFlights.css";

function SearchFlights(props) {
  const [activeTab, setActiveTab] = useState('popular');
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeoData = () => {
      fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
          setCity(data.city);
          props.onNewResult(data.city);
        })
        .catch(() => {
          setError('Failed to fetch city data.');
        });
    };

    fetchGeoData();
  }, []);

  const flightsData = {
    popular: city
      ? [
          `Flights from ${city} to London`,
          `Flights from ${city} to Paris`,
          `Flights from ${city} to Milan`,
          `Flights from ${city} to New York`,
          `Flights from ${city} to Barcelona`,
          `Flights from ${city} to Rome`,
          `Flights from ${city} to Athens`,
          `Flights from ${city} to Frankfurt`,
          `Flights from ${city} to Copenhagen`,
          `Flights from ${city} to Madrid`,
        ]
      : ['Loading flights...'],
    otherCities: [
      "Flights from Istanbul to Dubai",
      "Flights from London to Madrid",
      "Flights from Berlin to Amsterdam",
      "Flights from Tokyo to Los Angeles",
      "Flights from Rome to New York",
      "Flights from Sydney to Singapore",
      "Flights from Dubai to Toronto",
      "Flights from Paris to Moscow",
      "Flights from Madrid to São Paulo",
      "Flights from Zurich to Bangkok",
    ],
    toTelAviv: city
      ? [
          `Flights from London to ${city}`,
          `Flights from Paris to ${city}`,
          `Flights from New York to ${city}`,
          `Flights from Berlin to ${city}`,
          `Flights from Rome to ${city}`,
          `Flights from Athens to ${city}`,
          `Flights from Istanbul to ${city}`,
          `Flights from Madrid to ${city}`,
          `Flights from Vienna to ${city}`,
          `Flights from Amsterdam to ${city}`,
        ]
      : ['Loading flights...'],
  };

  return (
    <>
      <div className="big-div">
        <h1>Search more flights</h1>
        <h6>More places to fly</h6>

        <div className="tabs">
          <div
            className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            {city ? `Popular destinations from ${city}` : 'Loading...'}
          </div>
          <div
            className={`tab ${activeTab === 'otherCities' ? 'active' : ''}`}
            onClick={() => setActiveTab('otherCities')}
          >
            Flights from other cities
          </div>
          <div
            className={`tab ${activeTab === 'toTelAviv' ? 'active' : ''}`}
            onClick={() => setActiveTab('toTelAviv')}
          >
            {city ? `Flights to ${city}` : 'Loading...'}
          </div>
        </div>

        <div className="links">
          {flightsData[activeTab].map((flight, index) => (
            <div key={index}>
              <a href="#">{flight}</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchFlights;
