const { ObjectId } = require('mongodb')
const connectToDb = require('./lib/connect-to-db')
const repackResults = require('./lib/repack-results')
const base64url = require('./lib/base64url')

const dbCollection = process.env.MONGODB_COLLECTION

module.exports = async (req, res) => {
  const { query: { id } } = req

  if (!id) {
    res.status(500).json({ type: 'error', message: 'Not a valid id' })
    return
  }

  const people = base64url.decode(id)

  try {
    const db = await connectToDb()
    const collection = db.collection(dbCollection)
    const scores = await Promise.all(
      people.map(async item => {
        const data = await collection.findOne({ _id: ObjectId(item.id) })
        return { data, name: item.name }
      })
    )

    const results = repackResults(scores, scores[0].data.lang)

    res.json(results)
    return
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}
