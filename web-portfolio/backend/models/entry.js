const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  caption: { type: String, required: true },
  images: [{ type: String, required: true }]
})

const portfolioDb = mongoose.connection.useDb('portfolio')
const Entry = portfolioDb.model('Entry', entrySchema)

module.exports = Entry