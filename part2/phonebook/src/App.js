import { useState, useEffect } from 'react'
import { Filter, Persons, PersonsForm } from './components'

import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [contactToShow, setContactToShow] = useState([])

  // Get all Contacts from the server when the app starts
  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // Adding new contact
  const addContact = (event) => {
    event.preventDefault()

    // Prevent Duplicate Names
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        contactService
          .update(person.id, changedPerson)
          .then(() => {
            contactService
              .getAll()
              .then(response => {
                setPersons(response.data)
              })
          })
          .catch(error => {
            alert(
              `the contact for '${person.name}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.name !== newName))
          })
      }
      return
    }

    const contactObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    contactService
      .create(contactObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  // Deleting a contact
  const deleteContact = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      contactService
        .deleteContact(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          alert(
            `the contact for '${person.name}' has  already been deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const updateContactsToShow = () => {
    if (newFilter === '') {
      setContactToShow(persons)
    }
    else {
      setContactToShow(persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))
    }
  }
  useEffect(() => updateContactsToShow(), [newFilter, persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new Contact</h3>
      <PersonsForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={contactToShow} deleteContact={deleteContact} />
    </div>
  )
}

export default App