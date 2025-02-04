import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/faq.css";

function FAQ(props) {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAndAnswers = [
    {
      question: `Which cities have direct flights from ${props.result}?`,
      content: `El Al offers direct flights from ${props.result} to 40 cities. The most frequent destinations are: Paris, London, New York, Tbilisi, and Athens.
        Israir Airlines offers direct flights from ${props.result} to 21 cities. The most frequent destinations are: Eilat, Athens, Sofia, Larnaca, and Dubai.
        Arkia offers direct flights from ${props.result} to 12 cities. The most frequent destinations are: Athens, Dubai, Larnaca, Batumi, and Paris.
        Wizz Air offers direct flights from ${props.result} to 12 cities. The most frequent destinations are: Larnaca, Budapest, Bucharest, London, and Sofia.
        Bluebird Airways offers direct flights from ${props.result} to 6 cities. The most frequent destinations are: Athens, Barcelona, Berlin, Rome, and Prague.
        Tus Air offers direct flights from ${props.result} to 3 cities. The most frequent destinations are: Larnaca, Vienna, and Sofia.`
    },
    {
      question: `What are some good flight destinations from ${props.result}?`,
      content: `Some popular flight destinations from ${props.result} are London, Paris, Milan, New York, Barcelona, and Athens. To find more cheap flights to other destinations, use the Explore tool by interacting with the map above.`
    },
    {
      question: `What is the best airline to fly with from ${props.result}?`,
      content: `What counts as the best airline for your flights from ${props.result} really depends on your individual needs. You may have a favourite carrier or a loyalty programme that you like, but price, convenience, and airports served also come into play. Flexibility and booking terms – whether you can change flights if you want to stay longer or get a refund if you have to postpone your trip – are also factors that help determine which airline is best to fly with from ${props.result}.
        In terms of direct flights, El Al is the most popular, flying directly to 40 cities. El Al flies from Ben Gurion Airport (TLV).
        Other popular airlines flying from ${props.result} are Israir Airlines, Arkia, Wizz Air, Bluebird Airways, and Tus Air.
        Israir Airlines flies directly to 21 cities. Israir Airlines flies from Ben Gurion Airport (TLV).
        Arkia flies directly to 12 cities. Arkia flies from Ben Gurion Airport (TLV).
        Wizz Air flies directly to 12 cities. Wizz Air flies from Ben Gurion Airport (TLV).
        Bluebird Airways flies directly to 6 cities. Bluebird Airways flies from Ben Gurion Airport (TLV).
        Tus Air flies directly to 3 cities. Tus Air flies from Ben Gurion Airport (TLV).`
    },
    {
      question: `What is the best airport to fly out of ${props.result}?`,
      content: `${props.result} is served by only one major airport: Ben Gurion Airport, 12 km away from the city centre.`
    },
    {
      question: `How long before a flight should I arrive at the airport in ${props.result}?`,
      content: `It's usually recommended that you arrive at the airport two hours before departure time for a domestic flight and three hours before an international flight to allow for time to check in, clear security, and handle any unexpected delays. Check with your airline for any unique guidance and monitor the airport's website for updates or changes to procedures.`
    },
    {
      question: `How can I find last-minute flight deals from ${props.result}?`,
      content: `Finding last-minute flights from ${props.result} is easy on Google Flights. Select a destination in the form at the top of the page, then use the calendar to pick travel dates and find the lowest fares available. You can even check for flights departing today. To find the cheapest fares, it's usually best to book at least a few weeks in advance for domestic flights and a few months in advance for international travel.`
    },
    {
      question: `What is the cheapest place to fly from ${props.result}?`,
      content: `You can find cheap flight deals from ${props.result} to anywhere in the world on Google Flights. Just enter ${props.result} as your departure city, choose Anywhere as the destination and tap Explore. You can pick specific dates or leave the departure and return dates blank if your plans are flexible. The cheapest fares to popular destinations will appear. You can filter the results to see only non-stop flights or flights under a certain price to plan your perfect budget trip more easily.`
    }
  ];
  
  

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
    <div className='main'>
      <h1>Frequently asked questions about flying from {props.result}</h1>
      <div className="accordion">
        {questionsAndAnswers.map((item, index) => (
          <div 
            className={`accordion-item ${activeIndex === index ? 'open' : ''}`} 
            key={index}
          >
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <i
                className={`fas fa-chevron-down ${activeIndex === index ? 'active' : ''}`}
              ></i>
            </div>
            <div className="accordion-content">
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default FAQ;
