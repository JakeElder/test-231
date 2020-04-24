const { connect, uuid } = require('../api-modules/db')

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
  return collection.insertOne(session)
}

module.exports = {
  all,
  find,
  insert
}
