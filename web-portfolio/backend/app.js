const express = require('express')
const cors = require('cors') // import the cors package
const userRoutes = require('./routes/userRoutes')
const app = express()
const session = require('express-session')

// Enable CORS for all routes
app.use(cors())

// Middleware
app.use(express.json())

// express-session middleware
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // session cookie expires after 1 hour
}))

// Routes
app.use('/api/users', userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, message: 'Server error' })
})

module.exports = app
