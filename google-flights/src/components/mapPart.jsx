import React, { useEffect, useState } from "react";
import "../styles/mapPart.css";

function MapPart(props) {
  const [nearbyAirports, setNearbyAirports] = useState([]);

  useEffect(() => {
    const fetchNearbyAirports = async () => {
      try {
        const response = await fetch(
          "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=19.242218017578125&lng=72.85846156046128&locale=en-US",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
              "x-rapidapi-key": "95b193bd28msh6971b2a7b2a67fcp103c30jsn3f8defe1cbc5",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNearbyAirports(data.data.nearby);
      } catch (error) {
        console.error("Error fetching nearby airports:", error);
      }
    };

    fetchNearbyAirports();
  }, []);

  

  return (
    <div className="parent">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="map-container">
          <h1>Find flights from {props.result} to anywhere</h1>
          <div className="image-container">
            <img
              alt="World map with flight destinations marked"
              src="https://eoimages.gsfc.nasa.gov/images/imagerecords/144000/144898/BlackMarble_2016_01deg.jpg"
            />
            <button className="centered-button">Explore destinations</button>
          </div>
        </div>
      </div>

      <div className="Big">
        <h4>Popular airlines with direct flights from {props.result}</h4>
        <div className="grid-container">
          {[
            {
              name: "El Al",
              img: "https://storage.googleapis.com/a1aa/image/qO07eXUbGbdCHhwyS4shJI00kjsoLYlyJC6ItgjNV3w.jpg",
            },
            {
              name: "Israir Airlines",
              img: "https://storage.googleapis.com/a1aa/image/atsB8ieREkHL26YiW_uy_1r5oHuoscdJwpXtdfjZFjM.jpg",
            },
            {
              name: "Arkia",
              img: "https://storage.googleapis.com/a1aa/image/SgkDkdu1e7SbjDQsmiirlpTHXNDOSdxxXUMVO5y1m1o.jpg",
            },
            {
              name: "Wizz Air",
              img: "https://storage.googleapis.com/a1aa/image/CQz_jrwMe5wC_kD1AlArlne99t53110CSpdub-l1THU.jpg",
            },
            {
              name: "Bluebird Airways",
              img: "https://storage.googleapis.com/a1aa/image/8XqnHFNXvYQbvs2fe_YVKD5TugmtpDgP-gEgGJq6R6E.jpg",
            },
            {
              name: "Tus Air",
              img: "https://storage.googleapis.com/a1aa/image/fUjRrvHT_XuDUslOcB7Y0H_qKbsyEuWGcfehldc6J70.jpg",
            },
          ].map((airline, index) => (
            <div className="airline" key={index}>
              <div className="airline-info">
                <img
                  alt={`${airline.name} logo`}
                  height="40"
                  src={airline.img}
                  width="40"
                />
                <div>
                  <p style={{ marginLeft: "12px" }}>
                    {airline.name} <br /> Fly from {props.result} (TLV)
                  </p>
                </div>
              </div>
              <button className="dropdown">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          ))}
        </div>

        <h4>Popular airports near {props.result}</h4>
        <div className="grid-container">
          {nearbyAirports.slice(0, 4).map((airport, index) => (
            <div className="airport" key={index}>
              <div className="airport-info">
                <i style={{ color: "#8ab4f8" }} className="fas fa-plus-circle"></i>
                <div>
                  <p style={{ marginLeft: "12px" }}>
                    {airport.presentation.title} ({airport.navigation.entityId})<br />
                    {airport.presentation.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default MapPart;
