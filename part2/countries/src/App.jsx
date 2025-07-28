import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // Fetch lista paesi all’avvio
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  // Effettua il fetch meteo quando cambia showCountry
  useEffect(() => {
    if (!showCountry) {
      setWeather(null)
      return
    }

    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const capital = showCountry.capital && showCountry.capital[0]

    if (!capital) {
      setWeather(null)
      return
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`

      console.log('Weather URL:', weatherUrl)

    axios.get(weatherUrl)
      .then(response => setWeather(response.data))
      .catch(() => setWeather(null))
  }, [showCountry])

  // Gestione input filtro
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setShowCountry(null) // resetta la selezione quando si cambia filtro
  }

  // Filtra i paesi in base a input
  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  // Gestione click show country
  const handleShowClick = (country) => {
    setShowCountry(country)
  }

  return (
    <div>
      <h1>Country information</h1>
      <div>
        Find countries: <input value={filter} onChange={handleFilterChange} />
      </div>

      {filter === '' ? (
        <p>Please type to search countries</p>
      ) : filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length > 1 ? (
        <ul>
          {filtered.map(c => (
            <li key={c.cca3}>
              {c.name.common} <button onClick={() => handleShowClick(c)}>show</button>
            </li>
          ))}
        </ul>
      ) : filtered.length === 1 ? (
        <CountryDetail country={filtered[0]} weather={weather} />
      ) : showCountry ? (
        <CountryDetail country={showCountry} weather={weather} />
      ) : (
        <p>No matches found</p>
      )}
    </div>
  )
}




export default App
