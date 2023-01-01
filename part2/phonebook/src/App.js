import { useState, useEffect } from 'react'
import { Filter, Persons, PersonsForm } from './components'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const [contactToShow, setContactToShow] = useState(persons)

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
      console.log('newFilter is empty')
      setContactToShow(persons)
    }
    else {
      console.log('newFilter is not empty')
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