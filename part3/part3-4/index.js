const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const { type } = require('os')
let notes = require('./db.json').notes

const app = express()

app.use(express.static('build'))
app.use(express.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
// app.use(morgan(function(tokens, req, res) {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'),
//         '-',
//         tokens['response-time'](req, res),
//         'ms',
//         tokens.body(req, res)
//     ].join(' ')
// }))

app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :body'))
app.use(cors())

const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}
// app.use(requestLogger)

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.get('/', (req, res) => {
    res.status(200).send(JSON.stringify(notes))
})

app.get('/api/notes', (req, res) => {
    res.status(200).send(JSON.stringify(notes))
})

app.post('/api/notes', (req, res) => {
    const note = req.body
    notes.push(note)
    
    fs.writeFile('./db.json', JSON.stringify({notes: notes}), err => {
        if (!err)
            res.status(200).send(JSON.stringify(note))
        else 
            res.status(404).end()
    })
})

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)

    if (note) {
        notes = notes.map(n => n.id === id ? req.body : n)
        fs.writeFile('./db.json', JSON.stringify({notes: notes}), err => {
            if (!err) 
                res.status(200).send(JSON.stringify(req.body))
            else
                res.status(404).end()
        })
    } else {
        res.status(404).end()
    }
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))