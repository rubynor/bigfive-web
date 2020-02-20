const cors = require('micro-cors')()
const connectToDb = require('./lib/connectToDb')

const dbCollection = process.env.MONGODB_COLLECTION

const handler = async (req, res) => {
  const { body: payload } = req

  if (!payload) {
    res.status(500).json({ type: 'error', message: 'Not a valid payload' })
    return
  }

  try {
    const db = await connectToDb()
    const collection = db.collection(dbCollection)

    const data = await collection.insertOne(payload)
    res.send({ id: data.insertedId })
    return
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

module.exports = cors(handler)
