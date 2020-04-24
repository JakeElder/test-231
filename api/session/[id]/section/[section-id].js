const { connectToDatabase } = require('../../../../api-modules/db')

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const session = await collection.findOne({ id: req.query.id })

  if (!session) {
    res.status(404).send()
    return
  }

  const sectionId = req.query['section-id']

  const completed = session.answers.some(a => a.sectionId === sectionId)

  const open = (() => {
    // Can only submit once
    if (completed) {
      return false
    }

    // If session has commenced and less time has passed than allocated
    // then section is open
    if (session.commenced !== null) {
      const timePassed = Date.now() - new Date(session.commenced).getTime()
      if (timePassed < session.timeAllocated) {
        return true
      }
    }

    // Otherwise closed
    return false
  })()

  res.status(200).json({
    data: {
      id: sectionId,
      completed,
      open
    }
  })
}
