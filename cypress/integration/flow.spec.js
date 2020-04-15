describe('Unauthenticated Flow', () => {
  it('Displays the test unavailable page', () => {
    cy.server()
    cy.route({
      method: 'post',
      url: '/api/session',
      status: 404,
      response: ''
    }).as('session-request')

    cy.visit('/')
    cy.get('[data-page=loading-page]').should('exist')

    cy.wait('@session-request').then(xhr => {
      expect(xhr.request.headers, 'request headers').to.include({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      })
    })

    cy.url().should('eq', `${Cypress.config().baseUrl}/test-unavailable`)
    cy.get('[data-page=test-unavailable]').should('exist')
  })
})
