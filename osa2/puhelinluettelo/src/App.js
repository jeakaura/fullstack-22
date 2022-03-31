import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons]         = useState([
    { id: 1,  name: 'Arto Hellas',      number: '040-123456'    },
    { id: 2,  name: 'Ada Lovelace',     number: '39-44-5323523' },
    { id: 3,  name: 'Dan Abramov',      number: '12-43-234345'  },
    { id: 4,  name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName,     setNewName]     = useState('')
  const [newNumber,   setNewNumber]   = useState('')
  const [searchName,  setSearchName]  = useState('')

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} on jo puhelinluettelossa`)
    }
    else {
      setPersons(persons.concat(noteObject))
    }
    setNewName('')
    setNewNumber('')
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
        <div>
        hae nimellä:
          <input onChange={handleFilter} />
        </div>
      <h2>Lisää uusi</h2>
      <form onSubmit={addName}>
        nimi:
        <input
          value={newName}
          onChange={handleNoteChange}
        />
        <br />
        numero:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        <br />
        <button type="submit">lisää</button>
      </form>
      <h2>Numerot</h2>
      <div>
        {filtteri.map(name => 
          <Person key={name.id} person={name} number={name.number} />
        )}
      </div>
    </div>
  )

}

export default App