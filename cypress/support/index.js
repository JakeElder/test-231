import './commands'
import url from 'url'

Cypress.on('window:before:load', win => {
  win.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true }
})

Cypress.Server.defaults({
  whitelist: req => {
    const { pathname } = url.parse(req.url)
    if (/^\/(page-data|socket\.io)/.test(pathname)) {
      return true
    }
    return false
  }
})
