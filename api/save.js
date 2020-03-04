const connectToDb = require('./lib/connect-to-db')
const validate = require('./lib/validate-test')
const dbCollection = process.env.MONGODB_COLLECTION

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.send('ok!')
    return
  }

  const { body: payload } = req

  if (!payload) {
    res.status(400).json({ type: 'error', message: 'Not a valid payload' })
    return
  }

  const { error } = validate(payload)
  const isValid = !error

  if (!isValid) {
    res.status(400).json({ type: 'error', message: error })
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
