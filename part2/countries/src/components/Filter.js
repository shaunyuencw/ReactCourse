const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <form>
            Find Countries: <input value={newFilter} onChange={handleFilterChange}></input>
        </form>
       
    )
}

export default Filter