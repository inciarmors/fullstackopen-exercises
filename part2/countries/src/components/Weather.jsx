import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!capital) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`

    axios.get(url)
      .then(response => setWeather(response.data))
      .catch(() => setWeather(null))
  }, [capital, api_key])

  if (!weather) return <p>Loading weather...</p>

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}
