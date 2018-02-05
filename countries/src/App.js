import React from 'react'

import axios from 'axios'

const Country = ({ country }) => {
  if (!country) return null
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt="flag" />
    </div>
  )
}

const CountryList = ({ countries, onClickCountry }) => {
  if (countries.length < 2) {
    return null
  }

  if (countries.length > 10) {
    return "too many matches"
  }

  return countries.map(country => <div key={country.name} onClick={() => onClickCountry(country)}>{country.name}</div>)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      country: null,
      search: '',
      matchedCountries: []
    }
  }

  componentWillMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleSearch = event => {
    let search = event.target.value
    let matchedCountries = this.state.countries.filter(
      country => country.name.toUpperCase().includes(search.toUpperCase())
    )
    let country = matchedCountries.length === 1 ? matchedCountries[0] : null
    this.setState({ search, country, matchedCountries })
  }

  onClickCountry = country => {
    this.setState({ country })
  }

  render() {
    return (
      <div>
        find countries:<input onChange={this.handleSearch} />
        <div>
          <CountryList countries={this.state.matchedCountries} onClickCountry={this.onClickCountry} />
          <Country country={this.state.country} />
        </div>
      </div>
    )
  }
}

export default App  