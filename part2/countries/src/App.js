import React, { useEffect, useState } from 'react';


import Axios from 'axios';

function WeatherData({ city, apiKey }) {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    Axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
      .then((r) => {
        console.log(r.data);
        setWeather(r.data.current);
      });


  }, [city, apiKey]);

  if (weather === null) return (<div>Loading...</div>)

  return (<div>
    <h2>Weather in {city}</h2>
    <img src={weather.weather_icons[0]} alt="current weather"></img>
    <p>temp: {weather.temperature}</p>
    <p>humidity: {weather.humidity}</p>
    <p>description: {weather.weather_descriptions.join(' + ')}</p>
  </div>);
}

function CountryData({ data, setQuery, weatherKey }) {

  const handleClick = (nq) => {
    return (ev) => {
      ev.preventDefault();
      setQuery(nq);
    }
  };

  if (data.length === 0) {
    return (<div>No results</div>)
  } else if (data.length > 10) {
    return (<div>Too many results ({data.length})</div>)
  } else if (data.length === 1) {
    const country = data[0];
    const noCapital = country.capital.trim() === '';
    const textOne = noCapital ? `The population of ${country.name} is ${country.population}.` : `The population of ${country.name} is ${country.population}, and its capital is ${country.capital}.`;
    //{country.demonym}
    return (
      <div>
        <h2>{country.name} ({country.nativeName})</h2>
        <img src={country.flag} alt={'Flag of ' + country.name} style={{ width: '180px' }}></img><br />
        <span>{textOne}</span><br />

        <span>Their people speak {country.languages.map((lang) => lang.name).join(", ")}.</span><br />
        <span>{country.name} is located in {country.subregion}</span>
        <WeatherData city={noCapital ? country.name : country.capital} apiKey={weatherKey}></WeatherData>
      </div>
    )
  }
  else {
    return (
      <ul>
        {data.map((c) => (<li key={c.alpha3Code}>{c.name} ({c.nativeName})<button onClick={handleClick(c.name)}>goto</button></li>))}
      </ul>
    )
  }
}

function App() {

  const [query, setQuery] = useState('Macao');
  const [countries, setCountries] = useState([]);

  const weatherKey = process.env['REACT_APP_WEATHERSTACK_KEY'];

  useEffect(() => {
    if (query.trim() === '') return;
    // Twist, we send a new get on every change of the input.
    Axios.get(`https://restcountries.eu/rest/v2/name/${query}`).then((r) => {
      console.log(r.data);
      setCountries(r.data);
    }).catch((r) => {
      console.log(r.response);
      if (r.response.status === 404) {
        setCountries([]);
      }
    });
  }, [query]);

  return (
    <div className="App">
      Query: <input type="text" value={query} onChange={(ev) => { setQuery(ev.target.value) }}>
      </input>
      <CountryData data={countries} setQuery={setQuery} weatherKey={weatherKey}></CountryData>
    </div>
  );
}

export default App;
