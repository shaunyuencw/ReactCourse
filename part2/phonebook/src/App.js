import { useState, useEffect } from 'react'
import { Filter, Persons, PersonsForm } from './components'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [contactToShow, setContactToShow] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => updateContactsToShow(), [newFilter])

  const updateContactsToShow = () => {
    if (newFilter === '') {
      setContactToShow(persons)
    }
    else {
      setContactToShow(persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))
    }
  }

  const addContact = (event) => {
    event.preventDefault()

    // Prevent Duplicate Names
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const contactObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(contactObject))
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => updateContactsToShow(), [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new Contact</h3>
      <PersonsForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={contactToShow} />
    </div>
  )
}

export default App