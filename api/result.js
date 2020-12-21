const { ObjectId } = require('mongodb')
const validMongoId = require('./lib/valid-mongoid')
const connectToDb = require('./lib/connect-to-db')
const getResult = require('b5-result-text-custom')
const { getInfo } = require('b5-result-text-custom')
const calculateScore = require('@alheimsins/bigfive-calculate-score')

const { languages: availableLanguages } = getInfo()

const dbCollection = process.env.MONGODB_COLLECTION

module.exports = async (req, res) => {
  const { query: { id, lang } } = req
  if (!id || !validMongoId(id)) {
    res.status(500).json({ type: 'error', message: 'Not a valid id' })
    return
  }

  try {
    const db = await connectToDb()
    const collection = db.collection(dbCollection)
    const data = await collection.findOne({ _id: ObjectId(id) })
    if (!data) {
      res.json({ type: 'notFound', message: 'Kayıt bulunamadı. Lütfen farklı bir ID veya Link deneyin.', results: [] })
      return
    }
    const scores = calculateScore(data)
    const results = getResult({ scores, lang: 'tr' })

    res.json({
      timestamp: data.dateStamp,
      language: data.lang,
      availableLanguages: availableLanguages.map(item => ({ value: item.id, ...item })),
      age: '',
      gender: '',
      nationality: '',
      results
    })
    return
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}
