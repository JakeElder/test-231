const { MongoClient } = require('mongodb')
const url = require('url')
const short = require('short-uuid')
const humanInterval = require('human-interval')
const uuid = short('abcdefghijklmnopqrstuvwxyz0123456789-')
const ObjectsToCsv = require('objects-to-csv')

let cachedDb = null
let cachedClient = null

async function connectToDatabase(uri, dbName) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  dbName = dbName || url.parse(uri).pathname.substr(1)
  const db = await client.db(dbName)

  cachedDb = db
  cachedClient = client

  return db
}

async function closeConnection() {
  await cachedClient.close()
  cachedClient = null
  cachedDb = null
}

function prepareSession(session) {
  return {
    name: session.name,
    id: session.id || uuid.new(),
    answers: session.answers || [],
    commenced: session.commenced ? new Date(session.commenced) : null,
    completed: session.completed ? new Date(session.completed) : null,
    timeAllocated: humanInterval('15 minutes')
  }
}

async function reset() {
  const db = await connectToDatabase(
    process.env.MONGODB_URI,
    process.env.MONGODB_DB_NAME
  )
  const collection = await db.collection('sessions')
  await collection.deleteMany({})
  await closeConnection()
}

async function seed() {
  const db = await connectToDatabase(
    process.env.MONGODB_URI,
    process.env.MONGODB_DB_NAME
  )
  const collection = await db.collection('sessions')
  const seedData = require('../seed.json')
  const sessions = seedData.map(prepareSession)
  await collection.insertMany(sessions)
  const csv = new ObjectsToCsv(
    sessions.map((s, idx) => {
      return {
        Name: s.name,
        Recipient: seedData[idx].email,
        Token: s.id
      }
    })
  )
  await csv.toDisk('./mailing-list.csv')
  await closeConnection()
}

module.exports = {
  connect: connectToDatabase,
  connectToDatabase,
  reset,
  seed,
  prepareSession,
  uuid: () => uuid.new()
}
