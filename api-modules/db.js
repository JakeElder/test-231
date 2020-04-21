const { MongoClient } = require('mongodb')
const url = require('url')
const short = require('short-uuid')
const uuid = short('abcdefghijklmnopqrstuvwxyz0123456789-')

let cachedDb = null
let cachedClient = null

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = await client.db(url.parse(uri).pathname.substr(1))

  cachedDb = db
  cachedClient = client

  return db
}

async function addSession({ session }) {}

async function reset() {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  await collection.deleteMany({})
  await cachedClient.close()
}

function prepareSession(session) {
  return {
    name: session.name,
    id: session.id || uuid.new(),
    answers: session.answers || []
  }
}

async function seed() {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const sessions = require('../seed.json').map(prepareSession)
  await collection.insertMany(sessions)
  await cachedClient.close()
}

module.exports = {
  connect: connectToDatabase,
  connectToDatabase,
  addSession,
  reset,
  seed,
  prepareSession,
  uuid: () => uuid.new()
}
