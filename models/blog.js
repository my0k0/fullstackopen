const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id
        delete retObj._id
        delete retObj.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)