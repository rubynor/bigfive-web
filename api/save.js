const cors = require('micro-cors')()
const connectToDb = require('./lib/connectToDb')

const handler = async (req, res) => {
  const payload = req.body

  if (payload) {
    res.status(500).json({ type: 'error', message: 'Not a valid payload' })
  }

  try {
    const db = await connectToDb()
    const collection = db.collection('test')

    const data = await collection.insert(payload)
    res.send(data)
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

module.exports = cors(handler)
