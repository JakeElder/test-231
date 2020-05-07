const { connect, uuid } = require('../api-modules/db')
const { normalizeSession } = require('./session/[id]')
const { prepareSession } = require('../api-modules/db')

module.exports = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(404).send()
    return
  }

  const db = await connect(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')

  if (req.method === 'GET') {
    const query = (() => {
      if (!req.query.complete) {
        return {}
      }
      return {
        completed: { $ne: null }
      }
    })()
    const cursor = await collection.find(query)
    const data = await cursor.toArray()
    res.status(200).json({ data: data.map(normalizeSession) })
    return
  }

  const session = prepareSession({
    id: uuid(),
    name: req.body.name
  })

  const result = await collection.insertOne(session)

  res.json({ data: { session: normalizeSession(session) } })
}
