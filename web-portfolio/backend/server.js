const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const db = require('./config/db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function() {
  console.log('Connected to MongoDB')
})

const server = http.createServer(app)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server started on port ${port}`))
