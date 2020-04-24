const sid = '0033-jjkl'

describe('API Modules', () => {
  beforeEach(() => {
    cy.exec('yarn db:reset && yarn db:seed')
  })

  context('POST /api/session', () => {
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

  context('POST /api/session/[id]/answers', () => {
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
  })
})
