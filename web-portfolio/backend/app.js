const express = require('express')
const cors = require('cors') // import the cors package
const userRoutes = require('./routes/userRoutes')
const app = express()

// Enable CORS for all routes
app.use(cors())

// Middleware
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, message: 'Server error' })
})

module.exports = app
