import humanInterval from 'human-interval'

const sid = '0033-jjkl'

const baseSession = {
  id: 't3st',
  name: 'Someone B. Personson',
  answers: [],
  commenced: null,
  timePassed: 0,
  timeAllocated: humanInterval('15 minutes')
}

function mockSession(testData) {
  return { ...baseSession, ...testData }
}

describe('API', () => {
  beforeEach(() => {
    cy.exec('yarn db:reset && yarn db:seed')
  })

  describe('GET /api/session', () => {
    it('Retrieves all sessions', () => {
      cy.request(`/api/session`).then(res => {
        expect(res.status).to.equal(200)
        expect(res.body.data.length).to.equal(require('../../seed.json').length)
      })
    })
  })

  describe('GET /api/session/[id]', () => {
    it('Retrieves a session', () => {
      const session = mockSession()
      cy.task('insertSession', session)
      cy.request(`/api/session/${session.id}`).then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.nested.include({
          'data.name': baseSession.name
        })
      })
    })
  })

  describe('POST /api/session', () => {
    it('Adds a session', () => {
      const name = 'Someone B. Personson'
      cy.request({
        url: '/api/session',
        method: 'POST',
        body: { name }
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body).to.nested.include({
          'data.session.name': name
        })
        cy.task('getSession', { name }).then(
          session => expect(session).to.not.be.null
        )
      })
    })
  })

  describe('POST /api/session/[id]/answers', () => {
    it('Adds to the answers array', () => {
      const formData = { 'section-id': 1, 'answer-1': ['One', 'two'] }
      cy.request({
        method: 'POST',
        url: `/api/session/${sid}/answers`,
        body: formData
      }).then(response => {
        expect(response.status).to.equal(200)
        cy.task('getSession', { id: sid }).then(session => {
          expect(session).to.not.be.null
          expect(session.answers[0]).to.eql(formData)
        })
      })
    })

    it('Sets the complete property when posting the last answers', () => {
      const formData = { 'section-id': 'section-4', 'answer-1': ['One', 'two'] }
      cy.request({
        method: 'POST',
        url: `/api/session/${sid}/answers`,
        body: formData
      }).then(response => {
        expect(response.status).to.equal(200)
        cy.task('getSession', { id: sid }).then(session => {
          expect(session).to.not.be.null
          expect(session.completed).to.not.be.null
          expect(
            Date.now() - new Date(session.completed).getTime()
          ).to.be.below(3000)
        })
      })
    })
  })

  describe('POST /api/session/[id]/commencement', () => {
    it('Sets the commencement time in the session', () => {
      cy.request({
        method: 'POST',
        url: `/api/session/${sid}/commencement`
      }).then(response => {
        expect(response.status).to.equal(200)
        cy.task('getSession', { id: sid }).then(session => {
          // Check `commenced` has been updated to the current time.
          expect(
            Date.now() - new Date(session.commenced).getTime()
          ).to.be.below(3000)
        })
      })
    })

    it("Can't be called twice", () => {
      const commenced = new Date(Date.now() - humanInterval('4 minute'))

      const session = mockSession({ commenced })
      cy.task('insertSession', session)

      cy.request({
        method: 'POST',
        url: `/api/session/${baseSession.id}/commencement`
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.error).to.equal('ALREADY_COMMENCED')
        cy.task('getSession', { id: baseSession.id }).then(session => {
          // Check `commenced` has not been updated
          expect(session.commenced).to.equal(commenced.toISOString())
        })
      })
    })
  })

  describe('GET /api/session/[id]/section/[section-id]', () => {
    const sectionId = 'section-1-part-1'

    context('Before commencement', () => {
      it('Returns uncompleted and closed', () => {
        const session = mockSession()
        cy.task('insertSession', session)

        cy.request(`/api/session/${session.id}/section/${sectionId}`).then(
          response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.eql({
              data: {
                id: sectionId,
                completed: false,
                open: false
              }
            })
          }
        )
      })
    })

    context('During commenced session', () => {
      const commenced = new Date(Date.now() - humanInterval('1 minute'))

      context('When unanswered', () => {
        it('Returns incomplete and open', () => {
          const session = mockSession({ commenced })
          cy.task('insertSession', session)

          cy.request(`/api/session/${session.id}/section/${sectionId}`).then(
            response => {
              expect(response.status).to.equal(200)
              expect(response.body).to.eql({
                data: {
                  id: sectionId,
                  completed: false,
                  open: true
                }
              })
            }
          )
        })
      })

      context('When already answered', () => {
        it('Returns complete and closed', () => {
          const session = mockSession({
            commenced,
            answers: [{ sectionId, 'question-1': true }]
          })
          cy.task('insertSession', session)

          cy.request(`/api/session/${session.id}/section/${sectionId}`).then(
            response => {
              expect(response.status).to.equal(200)
              expect(response.body).to.eql({
                data: {
                  id: sectionId,
                  completed: true,
                  open: false
                }
              })
            }
          )
        })
      })
    })

    context('After session allocated time', () => {
      it('Returns closed regardless of completion state', () => {
        const session = mockSession({
          commenced: Date.now() - humanInterval('20 minutes')
        })
        cy.task('insertSession', session)

        cy.request(`/api/session/${session.id}/section/${sectionId}`).then(
          response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.eql({
              data: {
                id: sectionId,
                completed: false,
                open: false
              }
            })
          }
        )
      })
    })
  })
})
