import url from 'url'

Cypress.Server.defaults({
  whitelist: req => {
    const { pathname } = url.parse(req.url)
    if (/^\/(page-data|socket\.io)/.test(pathname)) {
      return true
    }
    return false
  }
})
