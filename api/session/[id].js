module.exports = (req, res) => {
  if (req.query.id !== '0033-jjkl' && req.query.id !== '0033-rngg') {
    return res.status(404).send()
  }
  res.json({
    data: {
      name: req.query.id === '0033-jjkl' ? 'Jake Elder' : 'Jirapat Jangjamras',
      id: req.query.id
    }
  })
}
