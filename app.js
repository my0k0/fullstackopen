const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const noteRouters = require('./controllers/notes')

mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.error('error connecting to MongoDB: ', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', noteRouters)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
