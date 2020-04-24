const { connectToDatabase } = require('../../api-modules/db')

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('sessions')
  const session = await collection.findOne({ id: req.query.id })

  if (!session) {
    res.status(404).send()
    return
  }

  res.status(200).json({
    data: {
      id: session.id,
      name: session.name,
      answers: session.answers,
      commenced: session.commenced,
      completed: session.completed,
      timeAllocated: session.timeAllocated,
      timePassed: (() => {
        if (session.commenced === null) {
          return 0
        }
        if (session.completed !== null) {
          return session.completed.getTime() - session.commenced.getTime()
        }
        const timePassed = Date.now() - session.commenced.getTime()
        return Math.min(timePassed, session.timeAllocated)
      })()
    }
  })
}
