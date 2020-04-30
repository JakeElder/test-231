const { connect, uuid } = require('../api-modules/db')
const { normalizeSession } = require('./session/[id]')

module.exports = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(404).send()
    return
  }

  const db = await connect(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')

  if (req.method === 'GET') {
    const cursor = await collection.find({})
    const data = await cursor.toArray()
    res.status(200).json({ data: data.map(normalizeSession) })
    return
  }

  const session = {
    id: uuid(),
    name: req.body.name,
    answers: []
  }

  await collection.insertOne(session)

  res.json({ data: { session } })
}
