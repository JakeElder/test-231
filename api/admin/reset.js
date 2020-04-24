const { reset, seed } = require('../../api-modules/db')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send()
    return
  }

  await reset()
  await seed()

  res.status(200).send()
}
