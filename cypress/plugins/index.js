const Session = require('../../api-modules/session')

module.exports = (on, config) => {
  on('task', {
    getSession: Session.find,
    getSessions: Session.all,
    insertSession: Session.insert,
    insertSessions: Session.insertMany
  })
}
