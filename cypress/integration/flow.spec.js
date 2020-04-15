describe('Unauthenticated Flow', () => {
  it('Displays the test unavailable page', () => {
    cy.server()
    cy.stubSessionRequest({
      status: 404,
      response: {}
    })

    const token = 'T0k3N'

    cy.visit(`?token=${token}`)
    cy.get('[data-page=loading-page]').should('exist')

    cy.expectSessionRequest({ token })

    cy.url().should('eq', `${Cypress.config().baseUrl}/test-unavailable`)
    cy.get('[data-page=test-unavailable]').should('exist')
  })
})
