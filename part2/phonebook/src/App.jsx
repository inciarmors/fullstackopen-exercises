import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError })
    setTimeout(() => setMessage(null), 4000)
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existing) {
      const confirm = window.confirm(
        `${existing.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirm) {
        const updated = { ...existing, number: newNumber }
        personService.update(existing.id, updated)
          .then(returned => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returned))
            showMessage(`Updated ${returned.name}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            showMessage(`Information of ${existing.name} has already been removed from server`, true)
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personService.create(newPerson)
      .then(returned => {
        setPersons(persons.concat(returned))
        showMessage(`Added ${returned.name}`)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return

    personService.remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showMessage(`Deleted ${person.name}`)
      })
      .catch(err => {
        showMessage(`Information of ${person.name} has already been removed from server`, true)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
