const session = require('../../api-modules/session')

module.exports = (on, config) => {
  on('task', {
    getSession(query) {
      return session.find(query)
    },
    getSessions() {
      return session.all()
    }
  })
}
