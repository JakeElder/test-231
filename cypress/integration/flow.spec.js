describe('Unauthenticated Flow', () => {
  it('Displays the Test Unavailable Page', () => {
    cy.server()
    cy.stubSessionRequest({ status: 404, response: {} })

    const token = 'T0k3N'

    cy.visit(`?token=${token}`)
    cy.get('[data-page=loading-page]').should('exist')

    cy.expectSessionRequest({ token })

    cy.url().should('eq', `${Cypress.config().baseUrl}/test-unavailable`)
    cy.get('[data-page=test-unavailable]').should('exist')
  })
})

describe('Authenticated Flow', () => {
  it('Allows a Complete Test Run', () => {
    // Start a server to enable mocks
    cy.server()

    // Define mock tokens
    const clientToken = 'T0K3N'
    const responseToken = 'JWT'

    // Stub session request
    cy.stubSessionRequest({ status: 200, response: { token: responseToken } })

    // Check the loading page shows when navigating to the root
    cy.visit(`?token=${clientToken}`)
    cy.get('[data-page=loading-page]').should('exist')

    // Check the same token is sent for the session request call
    cy.expectSessionRequest({ token: clientToken })

    // Stub session get request
    cy.route({
      method: 'get',
      url: '/api/session',
      status: 200,
      response: {
        data: {
          name: 'Jake Elder',
          id: 'jake-elder'
        }
      }
    }).as('session-get-request')

    // Check we redirect to the introduction page
    cy.url().should('eq', `${Cypress.config().baseUrl}/introduction`)
    cy.get('[data-page=introduction]').should('exist')

    cy.wait('@session-get-request').then(({ request }) => {
      expect(request.headers).to.include({
        Authorization: `Bearer: ${responseToken}`
      })
    })
  })
})
