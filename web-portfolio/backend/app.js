// app.js
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const app = express()

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
