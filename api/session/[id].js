const url = require('url')
const { MongoClient } = require('mongodb')

const { connectToDatabase } = require('../api-modules/db')

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const user = await collection.findOne({ id: req.query.id })

  if (!user) {
    res.status(404).send()
    return
  }

  res.status(200).json({
    data: {
      id: user.id,
      name: user.name
    }
  })
}
