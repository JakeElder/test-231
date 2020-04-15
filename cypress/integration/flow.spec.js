describe('Unauthenticated Flow', () => {
  it('Displays the Test Unavailable Page', () => {
    cy.server()
    cy.stubSessionPostRequest({ status: 404, response: {} })

    const token = 'T0k3N'

    cy.visit(`?token=${token}`)
    cy.get('[data-page=loading-page]').should('exist')

    cy.expectSessionPostRequest({ token })

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
    cy.stubSessionPostRequest({
      status: 200,
      response: { token: responseToken }
    })

    // Check the loading page shows when navigating to the root
    cy.visit(`?token=${clientToken}`)
    cy.get('[data-page=loading-page]').should('exist')

    // Check the same token is sent for the session request call
    cy.expectSessionPostRequest({ token: clientToken })

    // Stub session get request
    cy.stubSessionGetRequest()

    // Check we redirect to the introduction page
    cy.url().should('eq', `${Cypress.config().baseUrl}/introduction`)
    cy.get('[data-page=introduction]').should('exist')

    // Check the correct Authorization token is sent in the subsequent request
    cy.expectSessionGetRequest({ bearerToken: responseToken })
  })
})
