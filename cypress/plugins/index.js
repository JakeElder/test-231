const session = require('../../api-modules/session')

module.exports = (on, config) => {
  on('task', {
    getSession: session.find,
    getSessions: session.all
  })
}
