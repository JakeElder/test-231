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
        const timePassed = Date.now() - new Date(session.commenced).getTime()
        return Math.min(timePassed, session.timeAllocated)
      })()
    }
  })
}
