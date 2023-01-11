import { useState, useEffect } from 'react'
import { Filter, Persons, PersonsForm, Notification } from './components'

import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [contactToShow, setContactToShow] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  // Get all Contacts from the server when the app starts
  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response)
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

            setMessage(`Updated ${newName}`)
            setType('success')
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
        setMessage(`Added ${newName}`)
        setType('success')
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
          setMessage(`Information of ${person.name} deleted successfully`)
          setType('success')
        })
        .catch(error => {
          setPersons(persons.filter(n => n.id !== id))
          setMessage(`Information of ${person.name} has already been removed from server`)
          setType('error')
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
      <Notification message={message} type={type} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new Contact</h3>
      <PersonsForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={contactToShow} deleteContact={deleteContact} />
    </div>
  )
}

export default App