const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


const generateInfo = () => {
    const infoPeople = "Phonebook has info for " + persons.length.toString() + " people"
    const infoTime = Date(Date.now());
    return "<p>" + infoPeople + "</p><p>" + infoTime + "</p>"
}

app.get('/info', (request, response) => {
    response.send(generateInfo())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing',
        })
    }

    if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({
            error: 'name duplicate',
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing',
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
