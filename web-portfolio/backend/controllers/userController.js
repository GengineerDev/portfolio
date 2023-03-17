const bcrypt = require('bcrypt')
const User = require('../models/user')
const connection = require('../config/db')

exports.getUser = async (req, res) => {
  const { username, password } = req.body
  console.log("Got here!")
  try {
    const db = connection.useDb('user')
    const user = await db.collection('user').findOne({ username })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        // Passwords match
        res.json({ success: true, user })
      } else {
        // Passwords don't match
        res.status(401).json({ success: false, message: 'Invalid credentials' })
      }
    } else {
      // User not found
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
