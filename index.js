require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :body'))
app.use(cors())

const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}
app.use(requestLogger)

// Routes
app.get('/', (req, res) => {
    Note.find({})
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json({error: 'contents loading'}))
})

app.get('/api/notes', (req, res) => {
    Note.find({})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json({error: 'contents loading'}))
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note)
                res.json(note)
            else 
                res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
})

app.post('/api/notes', (req, res, next) => {
    const body = req.body

    if (body.content === undefined)
        return res.status(400).json({error: 'content missing'})

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save()
        .then(savedNote => res.json(savedNote))
        .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const {content, important} = req.body

    Note.findByIdAndUpdate(
        req.params.id, 
        {content, important}, 
        {new: true, runValidators: true, context: 'query'}
        )
        .then(retNote => {
            res.json(retNote)
        })
        .catch(err => {
            next(err)
        })
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(success => {
            res.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError') 
        return res.status(400).send({error: 'malformated id'})
    else if (err.name === 'ValidationError')
        return res.status(400).json({error: err.message})
    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))