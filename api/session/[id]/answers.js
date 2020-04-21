module.exports = (req, res) => {
  // console.log(req)
  console.log(req.body)
  console.log(req.headers)
  res.json({
    body: req.body,
    headers: req.headers,
    id: req.query.id
  })
}
