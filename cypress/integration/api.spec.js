describe('API Modules', () => {
  beforeEach(() => {
    // cy.task('get').then((...args) => {
    // console.log(args)
    // })
  })

  context('POST /api/session', () => {
    it('is adds a session', function() {
      const name = 'Someone B. Personson'

      cy.request({
        url: '/api/session',
        method: 'POST',
        body: { name }
      })
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.body).to.nested.include({ 'data.session.name' name })
      })
    })
  })
})
