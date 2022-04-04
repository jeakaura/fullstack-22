import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import personService from './services/persons'

const App = () => {
  const [persons,     setPersons]     = useState([]) 
  const [newName,     setNewName]     = useState('')
  const [newNumber,   setNewNumber]   = useState('')
  const [searchName,  setSearchName]  = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((p) => p.name === newName);
      const { id } = person;
      const vahvistaMuutos = window.confirm(`${newName} on jo puhelinluettelossa, korvataanko vanha numero uudella?`)

      if (vahvistaMuutos) {
        personService
        .update(person.id, noteObject)
        .then((response) => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        })
        setNewName('')
        setNewNumber('')
        return;
      }
    }
    else {
      setPersons(persons.concat(noteObject))
      personService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const removeName = (id) => {
    const person = persons.find((p) => p.id === id);
    const vahvistaPoisto = window.confirm(`Poistetaanko ${person.name}?`);
    if (vahvistaPoisto) {
      personService
      .remove(id)
      .then(() => {
        const uusi = persons.filter((person) => person.id !== id);
        setPersons(uusi);
      })
    }
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearchName(event.target.value)
  };

  const filtteri = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <Filter 
        onChange={handleFilter} 
      />

      <h2>Lisää uusi</h2>

      <AddNew
        onSubmit={addName}
        newName={newName}
        handleNameChange={handleNoteChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numerot</h2>

      <Persons
        filtteri={filtteri}
        persons={persons}
        removeName={removeName}
      />

    </div>
  )

}

export default App