const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()

const app = express()

// Import routes
const blogsRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')

// Import middleware
const { errorHandler, unknownEndpoint } = require('./utils/middleware')

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI || 'mongodb://localhost/bloglist'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

// Routes
app.get('/', (request, response) => {
  response.send('<h1>Blog List API</h1>')
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Middleware for unknown endpoints and error handling
app.use(unknownEndpoint)
app.use(errorHandler)

// For testing purposes
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}

const PORT = process.env.PORT || 3003
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
