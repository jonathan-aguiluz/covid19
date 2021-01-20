import React, { useState, useEffect } from 'react';
import './App.css';

/*
* This function is used to get the data from Covid-19 API and
* populates the countries names in dropdown.
*/
function GetCountries() {

  const [country, setCountries] = useState(null);
  const [ctry, setCountry] = useState("Afghanistan");
  const [ctryInfo, setCountryInfo] = useState(0);

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  if(country){
    return (

      <React.Fragment>
        <div className="App-search">
          <label htmlFor="countries">Choose a Country: </label>
          <select className="select" name="countries" onChange={e => {setCountry(e.target.value); setCountryInfo(e.target.selectedIndex) }}>
            {country.Countries.map(c => (
              <option key={c.ID} value={c.Country}>{c.Country}</option> 
            ))}
          </select>
        </div>
        <h2>Results for {ctry}:</h2>
        <SearchData countryInfo={country} countryKey={ctryInfo} />
      </React.Fragment>

    );
  }

  return null;

}

function SearchData({ countryInfo, countryKey }) {

  let info = countryInfo.Countries[countryKey];

  return (
    <div className="center">
      <table>
        <thead>
          <tr>
            <td>New Confirmed</td>
            <td>New Deaths</td>
            <td>New Recovered</td>
            <td>Total Confirmed</td>
            <td>Total Deaths</td>
            <td>Total Recovered</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{info.NewConfirmed}</td>
            <td>{info.NewDeaths}</td>
            <td>{info.NewRecovered}</td>
            <td>{info.TotalConfirmed}</td>
            <td>{info.TotalDeaths}</td>
            <td>{info.TotalRecovered}</td>
            <td>{new Date(info.Date).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <React.Fragment>
      <div className="App-header"> <h1>Covid-19 Data</h1> </div>
      <GetCountries />
    </React.Fragment>
  );
}

export default App;
