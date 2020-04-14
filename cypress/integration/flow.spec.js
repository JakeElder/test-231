import url from 'url'

describe('Unauthenticated Flow', () => {

  it('Displays ', () => {
    cy.server()
    cy.route({
      method: 'post',
      url: '/api/session',
      status: 404,
      response: ''
    }).as('session-request')

    cy.visit('/')
    cy.get('.loading-page').should('exist')

    cy.wait('@session-request').then((xhr) => {
      expect(xhr.request.headers, 'request headers').to.include({
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      })
    })
  })

})
