import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = event => {
    event.preventDefault()

    const person = persons.find(person => newName.toLowerCase() === person.name.toLowerCase())

    if (person){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName.trim(), number: newNumber.trim()}))
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App