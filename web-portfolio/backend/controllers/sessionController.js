const connection = require('../config/db')

exports.createSession = async (req, res) => {
  const { userId } = req.body
  try {
    const db = connection.useDb('user')
    const session = await db.collection('session').insertOne({ userId })
    const sessionId = session.insertedId
    res.json({ success: true, sessionId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.deleteSession = async (req, res) => {
  const { sessionId } = req.body
  try {
    const db = connection.useDb('user')
    const result = await db.collection('session').deleteOne({ _id: sessionId })
    if (result.deletedCount === 1) {
      res.json({ success: true })
    } else {
      res.status(404).json({ success: false, message: 'Session not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
