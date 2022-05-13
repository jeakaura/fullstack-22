const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :omatoken'))
morgan.token('omatoken', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

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
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

const generateId = () => {
    const newId = Math.random() * (10000 - 4) + 4
    return Math.floor(newId)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'Nimi pakollinen' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'Numero pakollinen' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Serveri käynnissä portissa ${PORT}`)
})