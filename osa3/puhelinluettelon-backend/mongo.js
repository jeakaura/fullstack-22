const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.cfb9v.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true
    },
    number: {
        type: String,
        minlength: 1,
        required: true
    },
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length === 3) {
    console.log('puhelinluettelo:')
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
} else {
    person.save().then(result => {
        console.log(result)
        console.log(`henkilö ${person.name} numerolla ${person.number} tallennettiin!`)
        mongoose.connection.close()
    })
}
