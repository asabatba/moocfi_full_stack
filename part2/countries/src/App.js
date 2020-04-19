import React, { useEffect, useState } from 'react';


import Axios from 'axios';

function CountryData({ data }) {

  if (data.length === 0) {
    return (<div>No results</div>)
  } else if (data.length > 10) {
    return (<div>Too many results ({data.length})</div>)
  } else if (data.length === 1) {
    const country = data[0];
    return (
      <div>
        <h2>{country.name} ({country.nativeName})</h2>
        <img src={country.flag} alt={'Flag of ' + country.name} style={{ width: '180px' }}></img><br />
        <span>The population of {country.name} is {country.population}, and its capital is {country.capital}.</span><br />
        <span>{country.demonym} people speak {country.languages.map((lang) => lang.name).join(", ")}.</span><br />
        <span>{country.name} is located in {country.subregion}</span>
      </div>
    )
  }
  else {
    return (
      <ul>
        {data.map((c) => (<li key={c.alpha3Code}>{c.name} ({c.nativeName})</li>))}
      </ul>
    )
  }
}

function App() {

  const [query, setQuery] = useState('Romania');
  const [countries, setCountries] = useState([]);

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
      <CountryData data={countries}></CountryData>
    </div>
  );
}

export default App;
