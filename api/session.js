const short = require('short-uuid')

const { connect } = require('../api-modules/db')

const uuid = short('abcdefghijklmnopqrstuvwxyz0123456789-')

module.exports = async (req, res) => {
  const db = await connect(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')

  const session = {
    id: uuid.new(),
    name: req.body.name,
    answers: []
  }

  const r = await collection.insertOne(session)

  if (req.method === 'POST') {
    res.json({
      data: {
        session
      }
    })
  }
  res.status(404).send()
}
