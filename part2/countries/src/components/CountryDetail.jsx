const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital && country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages && Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150"
      />
      {country.capital && <Weather capital={country.capital[0]} />}
    </div>
  )
}

export default CountryDetail;
