const { connect, uuid } = require('../api-modules/db')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send()
    return
  }

  const db = await connect(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')

  const session = {
    id: uuid(),
    name: req.body.name,
    answers: []
  }

  await collection.insertOne(session)

  res.json({ data: { session } })
}
