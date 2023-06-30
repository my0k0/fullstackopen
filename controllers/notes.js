const noteRouters = require('express').Router()
const Note = require('../models/notes')

noteRouters.get('/', (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes)
        })
})

noteRouters.post('/', (req, res, next) => {
    const body = req.body
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note
        .save()
        .then(savedNote => {
            res.json(savedNote)
        })
        .catch(err => next(err))
})

noteRouters.get('/:id', (req, res, next) => {
    Note
        .findById(req.params.id)
        .then(retNote => {
            if (retNote)
                res.json(retNote)
            else 
                res.status(404).end()
        })
        .catch(err => next(err))
})

noteRouters.put('/:id', (req, res, next) => {
    const {content, important} = req.body
    Note
        .findByIdAndUpdate(req.params.id, {content, important}, {new: true})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})

noteRouters.delete('/:id', (req, res, next) => {
    Note
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(240).end()
        })
        .catch(err => next(err))
})

module.exports = noteRouters