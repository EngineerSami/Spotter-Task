import React,{ useState } from 'react'
import NavBar from './components/navbar'
import MidPage from './components/midpage'
import FAQ from './components/faq'
import Footer from './components/footer'
import PopularTrips from './components/Popular-trips'
import SearchFlights from './components/searchFlights'
import MapPart from './components/mapPart'

function App() {
  const [count, setCount] = useState(0)
  const [result, setResult] = useState("Loading...")
  const [currency, setCurrency] = useState("Loading...")
  const newResult = (res) => {
    setResult(res);
  }
  const newCurrency = (res) => {
    setCurrency(res);
  }

  return (
    <>
      <NavBar />
      <MidPage />
      <PopularTrips result={result} currency={currency} />
      <MapPart result={result} />
      <FAQ result={result} />
      <SearchFlights onNewResult={newResult} />
      <Footer onCurrency={newCurrency} />
    </>
  )
}

export default App
