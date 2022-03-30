import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        nimi:
        <input
          value={newName}
          onChange={handleNoteChange}
        />
        <button type="submit">lisää</button>
      </form>
      <h2>Numerot</h2>
      <div>
        {persons.map(name => 
          <Person key={name.id} person={name} />
        )}
      </div>
    </div>
  )

}

export default App