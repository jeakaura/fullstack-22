import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons,     setPersons]     = useState([]) 
  const [newName,     setNewName]     = useState('')
  const [newNumber,   setNewNumber]   = useState('')
  const [searchName,  setSearchName]  = useState('')
  const [message, setMessage] = useState(null)

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
    if (noteObject.name.length < 3) {
      setMessage(
        `error: Nimen tulee olla vähintään kolme merkkiä pitkä`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    if (noteObject.number.length < 8) {
      setMessage(
        `error: Numeron tulee olla vähintään kahdeksan merkkiä pitkä`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
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
        .catch(error => {
          alert(
            `Henkilö '${newName}' on jo ehditty poistamaan palvelimelta`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
        .then(() => {
          setMessage(
            `Henkilön '${newName}' numero korvattiin onnistuneesti.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      .then(() => {
        setMessage(
          `Henkilö '${newName}' lisättiin onnistuneesti puhelinluetteloon.`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
        console.log(error.response.data)
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
      .then(() => {
        setMessage(
          `Henkilö '${person.name}' poistettiin onnistuneesti puhelinluettelosta.`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <div>
        <Notification message={message} />
      </div>

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