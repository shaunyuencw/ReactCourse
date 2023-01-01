

const PersonsForm = ({ addContact, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange}></input><br/>
          number: <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonsForm