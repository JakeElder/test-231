const { connect, uuid } = require('../../../api-modules/db')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send()
    return
  }

  const db = await connect(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const session = await collection.findOne({ id: req.query.id })

  if (!session) {
    res.status(404).send()
    return
  }

  if (session.commenced !== null) {
    res.status(200).json({
      error: 'ALREADY_COMMENCED'
    })
    return
  }


  const r = await collection.updateOne(
    { _id: session._id },
    {
      $set: {
        commenced: new Date()
      }
    }
  )

  res.status(200).send()
}
