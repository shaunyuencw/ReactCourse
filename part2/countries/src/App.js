import { useState, useEffect } from 'react'
import axios from 'axios'

import { Country, CountryList, Filter } from './components'

const App = () => {
  const [newFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  
  const hook = () => {
    console.log('Getting countries...')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Countries fetched')
        setCountries(response.data)
      })
      
  }
  useEffect(hook, [])

  const loadFilteredCountries = () => {
    setFilteredCountries(countries)
  }
  useEffect(loadFilteredCountries, [countries])

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)
  }

  const updateFilterCountries = () => {
    if (newFilter === '') {
      setFilteredCountries(countries)
    }
    else {
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
    }
  }
  useEffect(updateFilterCountries, [newFilter])

  return (
    <>
      <h1>Countries App</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      
      <CountryList countries={filteredCountries} newFilter={newFilter} />
    </>
  )
}

export default App