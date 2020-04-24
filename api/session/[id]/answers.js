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

  const update = (() => {
    const base = { $push: { answers: req.body } }
    const afterCompletionCheck = (() => {
      if (req.body['section-id'] === 'section-4') {
        return {
          ...base,
          $set: { completed: new Date() }
        }
      }
      return base
    })()
    return afterCompletionCheck
  })()

  await collection.updateOne({ _id: user._id }, update)

  res.status(200).send()
}
