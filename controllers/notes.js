const noteRouters = require('express').Router()
const Note = require('../models/notes')

noteRouters.get('/', async (req, res) => {
    // Note
    //     .find({})
    //     .then(notes => {
    //         res.json(notes)
    //     })
    const notes = await Note.find({})
    res.json(notes)
})

noteRouters.post('/', async (req, res, next) => {
    const body = req.body
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    try {
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }
})

noteRouters.get('/:id', async (req, res, next) => {
    // Note
    //     .findById(req.params.id)
    //     .then(retNote => {
    //         if (retNote)
    //             res.json(retNote)
    //         else 
    //             res.status(404).end()
    //     })
    //     .catch(err => next(err))
    try {
        const note = await Note.findById(req.params.id)
        if (note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
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

noteRouters.delete('/:id', async (req, res, next) => {
    // Note
    //     .findByIdAndDelete(req.params.id)
    //     .then(() => {
    //         res.status(204).end()
    //     })
    //     .catch(err => next(err))
    try {
        await Note.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

module.exports = noteRouters