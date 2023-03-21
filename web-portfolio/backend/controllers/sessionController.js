const connection = require('../config/db')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')

async function findSession(userId, sessionId) {
  console.log("findSession!")
  const db = connection.useDb('user')
  const sessionData = await db.collection('session').find({ userId: new ObjectId(userId) }).toArray()

  for (let i = 0; i < sessionData.length; i++) {
    console.log(i)
    const isMatch = await bcrypt.compare(sessionId, sessionData[i].sessionID)
    if (isMatch) {
      return sessionData[i]
    }
  }

  return null
}

exports.createSession = async (req, res) => {
  const { userId } = req.session
  try {
    const db = connection.useDb('user')
    const salt = await bcrypt.genSalt(10)
    const hashedSessionID = await bcrypt.hash(req.sessionID, salt)
    const session = await db.collection('session').insertOne({ sessionID: hashedSessionID, userId: userId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getSession = async (req, res) => {
  const sessions = req.sessionStore.sessions
  console.log(sessions)
  if (!sessions || Object.keys(sessions).length === 0) {
    return null
  }
  
  const sessionKeys = Object.keys(sessions)
  const userId = JSON.parse(sessions[sessionKeys[0]]).userId
  console.log(userId)
  
  try {
    const session = await findSession(userId, sessionKeys[0])
    if (session) {
      res.json({ success: true, session })
    } else {
      res.status(404).json({ success: false, message: 'Session not found' })
    }

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.deleteSession = async (req, res) => {
  const { userId } = req.session
  const sessions = req.sessionStore.sessions
  const sessionKeys = Object.keys(sessions)
  console.log("deleteSession!")
  try {
    const session = await findSession(userId, sessionKeys[0])
    if (session) {
      const db = connection.useDb('user')
      const result = await db.collection('session').deleteOne({ _id: session._id })
      if (result.deletedCount === 1) {
        res.json({ success: true })
      } else {
        res.status(404).json({ success: false, message: 'Session not found' })
      }
    } else {
      res.status(404).json({ success: false, message: 'Session not found' })
    }

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}