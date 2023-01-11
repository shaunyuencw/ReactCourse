const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// Generate random id
const generateId = () => {
    return Math.floor(Math.random() * 1000000000)
}


// Configure Morgan middleware
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res, 'content-length'),
    ].join(' ')
}))


// Info
app.get('/info', (request, response) => {
    const numContact = persons.length
    response.send('<p>Phonebook has info for ' + numContact + ' people</p>' + '<p>' + new Date() + '</p>')

})

// Create a contact
app.post('/api/persons', (request, response) => {
    const body = request.body

    // Check if required fields are present
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing name or number'
        })
    }

    // Check if duplicate name exist
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    // Construct new person
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

// Read
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Read a single contact
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

// Delete 
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})