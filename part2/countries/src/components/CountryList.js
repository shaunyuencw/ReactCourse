import Country from './Country'
import CountryDetails from './CountryDetails'

import { useState } from 'react'

const CountryList = ({ countries }) => {
    const [showDetails, setShowDetails] = useState('')

    if (countries.length === 0) {
        return (
            <div>
                <p>No countries found</p>
            </div>
        )
    }
    else if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }

    else if (countries.length === 1) {
        const country = countries[0]
        return(
            <CountryDetails country={country} />
        )
    }

    else{
        return (
            <>
                <h2>Filtered Countries</h2>
                <div>
                    {countries && countries.map(country => <Country key={country.name.common} country={country} setShowDetails={setShowDetails} />)}
                    <CountryDetails country={showDetails} />
                </div>
            </>
        )
    }
}

export default CountryList