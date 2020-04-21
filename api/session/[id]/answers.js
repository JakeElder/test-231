const { connect, uuid } = require('../../../api-modules/db')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send()
    return
  }

  const db = await connect(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const user = await collection.findOne({ id: req.query.id })

  if (!user) {
    res.status(404).send()
    return
  }

  await collection.updateOne(
    { _id: user._id },
    { $push: { answers: req.body } }
  )

  res.status(200).send()

  // await collection.insertOne(session)

  // res.json({ data: { session } })
}
