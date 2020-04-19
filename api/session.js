module.exports = (req, res) => {
  res.json({
    body: req.body,
    headers: req.headers,
    query: req.query,
    cookies: req.cookies
  })
}
