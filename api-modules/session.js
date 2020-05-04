const { connect, uuid, prepareSession } = require('./db')
const { normalizeSession } = require('../api/session/[id]')

async function getSessionsCollection() {
  const db = await connect(process.env.MONGODB_URI)
  return db.collection('sessions')
}

async function find(query) {
  const collection = await getSessionsCollection()
  return collection.findOne(query)
}

async function all() {
  const collection = await getSessionsCollection()
  const cursor = await collection.find({})
  return cursor.toArray()
}

async function insert(session) {
  const collection = await getSessionsCollection()
  return collection.insertOne(normalizeSession(prepareSession(session)))
}

async function insertMany(sessions) {
  const collection = await getSessionsCollection()
  return collection.insertMany(
    sessions.map(s => normalizeSession(prepareSession(s)))
  )
}

module.exports = {
  all,
  find,
  insert,
  insertMany
}
