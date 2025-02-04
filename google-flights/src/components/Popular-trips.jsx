import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/popularTrips.css"; 

const PopularTrips = (props) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        const randomCountries = data
          .sort(() => 0.5 - Math.random()) 
          .slice(0, 6) 
          .map(country => ({
            name: country.name.common,
            flag: country.flags?.png || "https://via.placeholder.com/40", 
          }));
        setCountries(randomCountries);
      })
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="themain">
      <div className="breadcrumb">
        <a href="#" style={{ color: "#8ab4f8" }}>Flights</a> &gt; <a href="#">From {props.result}</a>
      </div>

      <div className="title">Cheap flights from {props.result}</div>

      <div className="subtitle">
        Popular trips from {props.result}
        <i className="fas fa-info-circle info-icon"></i>
      </div>

      <div className="flights">
        {countries.map((country, index) => (
          <div key={index} className="flight">
            <img
              className="flag-icon"
              alt={`Flag of ${country.name}`}
              src={country.flag}
            />
            
            <div className="flight-details">
              <div className="flight-title">{country.name}</div>
              <div className="flight-price">{props.currency} {Math.floor(Math.random() * 1000)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTrips;
