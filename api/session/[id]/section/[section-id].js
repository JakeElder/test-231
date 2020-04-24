const { connectToDatabase } = require('../../../../api-modules/db')

module.exports = async (req, res) => {
  console.log('a')
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const user = await collection.findOne({ id: req.query.id })

  if (!user) {
    res.status(404).send()
    return
  }

  res.status(200).json({
    data: {
      id: req.query['section-id'],
      completed: false,
      canSubmit: false
    }
  })
}
