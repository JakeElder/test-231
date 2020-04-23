const sid = '0033-jjkl' 

describe('API Modules', () => {
  beforeEach(() => {
    cy.exec('yarn db:reset && yarn db:seed')
  })

  context('POST /api/session', () => {
    it('is adds a session', function() {
      const name = 'Someone B. Personson'
      cy.request({
        url: '/api/session',
        method: 'POST',
        body: { name }
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body).to.nested.include({ 'data.session.name': name })
      })
    })
  })

  context('POST /api/session/[id]/answers', () => {
    it('is adds to the answers array', function() {
      cy.request({
        method: 'POST',
        url: `/api/session/${sid}/answers`,
        body: { 'section-id': 1 }
      }).then(response => {
        expect(response.status).to.equal(200)
      })
    })
  })
})
