const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())

app.use(express.static('build'))

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :omatoken'))
morgan.token('omatoken', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

app.get('/', (req, res) => {
  res.send('<p>Hello world!</p>')
})

app.get('/info', (req, res) => {
    let PVM = new Date()
    Person.find({}).then((persons) => {
      res.send(`
        <p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>
        <p>Pyyntö tehtiin: ${PVM}</p>
      `)
    })
  })

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name.length === 0) {
    return res.status(400).json({ error: 'nimi puuttuu' })
  }
  if (body.number.length === 0) {
    return res.status(400).json({ error: 'numero puuttuu' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new:true,runValidators:true})
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Tuntematon endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Serveri käynnissä portissa ${PORT}`)
})