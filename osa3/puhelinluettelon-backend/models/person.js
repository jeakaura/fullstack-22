const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Yhdistetään', url)

mongoose.connect(url)
    .then(result => {
        console.log('Yhdistetty MongoDB')
        console.log(result)
    })
    .catch((error) => {
        console.log('Virhe yhdistäessä MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)