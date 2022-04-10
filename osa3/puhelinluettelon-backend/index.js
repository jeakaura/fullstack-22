const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('<p>Hello world!</p>')
})

app.get('/info', (req, res) => {
    let LKM = persons.length
    let PVM = new Date()
    res.send(`
        <p>Puhelinluettelossa on ${LKM} henkilön tiedot</p>
        <p>Pyyntö tehtiin: ${PVM}</p>
    `)
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

const generateId = () => {
    const newId = Math.random() * (10000 - 4) + 4
    return Math.floor(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'nimi tai numero puuttuu'
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'nimen tulee olla uniikki'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
