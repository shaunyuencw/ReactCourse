const Country = ({ country, setShowDetails }) => {

    const handleShowDetail = (event) => {
        setShowDetails(country)
    }

    return (
        <>
            <span>
                {country.name.common}
                <button onClick={handleShowDetail}>Show</button>
                <br/>
            </span>
            
        </>
        
    )
}

export default Country