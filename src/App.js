import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import netService from './services/crud'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const generateID = () => {
    const maxID = Math.max(...persons.map(person => person.id))

    return maxID + 1
  }

  const addPerson = event => {
    event.preventDefault()

    const person = persons.find(person => newName.toLowerCase() === person.name.toLowerCase())

    if (person){
      const isReplace = window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one`)

      if (isReplace) {
        const updateObj = {
          ...person,
          number: newNumber
        }

        netService
          .update(person.id, updateObj)
          .then(retPerson => {
            setPersons(persons.map(p => p.id == retPerson.id ? retPerson : p))
          })
      }
    } else {
      const newPerson = {
        id: generateID(),
        name: newName.trim(),
        number: newNumber.trim()
      }

      netService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = e => {
    setNewNumber(e.target.value)
  }

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  let filteredPersons = []
  filteredPersons = persons.filter(person => {
    const regExp = new RegExp(filter, 'i')

    return regExp.test(person.name)
  })

  const handleDeletePerson = id => {
    const person = persons.find(p => p.id === id)

    const isDelete = window.confirm(`Delete ${person.name}?`)

    if (isDelete) {
      netService
      .delete(id)
      .then(success => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  useState(() => {
    netService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
      .catch(err => {
        console.error('some error from fetching data from server')
        setPersons([])
      })
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={handleDeletePerson} />
    </div>
  )
}

export default App