const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {id: 1, content: "HTML is easy", important: true},  
    {id: 2, content: "Browser can execute only JavaScript", important: false},  
    {id: 3, content: "GET and POST are the most important methods of HTTP protocol",important: true}
]

const generateID = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0

    return maxId + 1
}

app.get('/', (req, res) => {
    res.end('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes:id', (req, res) => {
    const id = Number(req.params.id)

    const note = notes.find(note => note.id === id)
    
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes:id', (req, res) => {
    const id = Number(req.params.id)

    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        id: generateID(),
        content: body.content,
        important: body.important || false,
    }

    notes = notes.concat(note)

    res.json(notes)
})