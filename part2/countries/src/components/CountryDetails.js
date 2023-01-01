import LanguageList from "./LanguageList"

const CountryDetails = ({ country }) => {
    if (country) {
        return (
            <>
                <h1>{country.name.common}</h1>
                <span>Capital: {country.capital}<br/></span>
                <span>Area: {country.area}<br/></span>
    
                <LanguageList languages={country.languages} />
                <img src={country.flags.png} alt={country.name.common} width="200" height="100" />

            </>
        )
    }
    
}

export default CountryDetails