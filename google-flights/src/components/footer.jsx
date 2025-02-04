import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/footer.css';

function Footer(props) {
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [language, setLanguage] = useState(null);
  const [countryCode, setCountryCode] = useState(null);

  const fetchGeoData = () => {
    fetch('https://ipinfo.io/json')
      .then(response => response.json())
      .then(data => {
        setCountryCode(data.country);
      })
      .catch(() => {
        setError('Failed to fetch country data.');
      });
  };

  const fetchCountryDetails = (code) => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(response => response.json())
      .then(data => {
        if (!data || data.length === 0) return;
        const countryData = data[0];
  
        setRegion(countryData.name?.common || 'Unknown');
  
        const availableCurrencies = countryData.currencies || {};
        const currencyCodes = Object.keys(availableCurrencies);
        
        const firstCurrencyCode = currencyCodes.length > 0 ? currencyCodes[0] : 'N/A';
        setCurrencies(firstCurrencyCode);
        props.onCurrency(firstCurrencyCode);
  
        setLanguage(countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A');
      })
      .catch(() => {
        setError('Failed to fetch country details.');
      });
  };
  

  useEffect(() => {
    fetchGeoData();
  }, []);

  useEffect(() => {
    if (countryCode) {
      fetchCountryDetails(countryCode);
    }
  }, [countryCode]);

  return (
    <div className="footer">
      <div className="content">
        <div className="options">
          <div><i className="fas fa-globe"></i> Language · {language || 'Loading...'}</div>
          <div><i className="fas fa-map-marker-alt"></i> Location · {region || 'Loading...'}</div>
          <div><i className="fas fa-money-bill-wave"></i> Currency · {currencies || 'Loading...'}</div>
        </div>

        <div className="info">
          Current language and currency options applied: {language || 'N/A'} - {region || 'N/A'} - {currencies || 'N/A'}<br />
          Displayed currencies may differ from the currencies used to purchase flights. <a href="#" className="learn-more">Learn more</a>
        </div> 

        <div className="info">
          Prices are final and include all taxes and fees, including payment fees for the cheapest common payment method (which may differ depending on the provider). Additional charges may apply for other types of payment, luggage, meals, WLAN, or other additional services. Prices, availability, and travel details are provided based on the latest information received from our partners. This information is reflected in the results within a period of less than 24 hours. Additional conditions may also be applied by our partners. You should then check prices and conditions with the service providers before booking.
        </div>

        <div className="links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Join user studies</a>
          <a href="#">Feedback</a>
          <a href="#">Help Centre</a>
        </div>
      </div>

      <div className="dropdowns">
        <div>International sites <i className="fas fa-chevron-down"></i></div>
        <div>Explore flights <i className="fas fa-chevron-down"></i></div>
      </div>
    </div>
  );
}

export default Footer;
