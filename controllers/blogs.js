const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res, next) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
        .catch(err => next(err))
})

blogsRouter.post('/', (req, res, next) => {
    const {title, author, url, likes} = req.body

    const blog = new Blog({
        title,
        author,
        url,
        likes: +likes
    })

    blog
        .save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(err => next(err))
})

module.exports = blogsRouter