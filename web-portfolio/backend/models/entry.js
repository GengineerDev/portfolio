const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  caption: { type: String, required: true },
  images: [{ type: String, required: true }]
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
