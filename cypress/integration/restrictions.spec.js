import humanInterval from 'human-interval'

const token = '0044-jjkl'

describe('Test Commencement', () => {
  it('Makes the commencement POST request when progressing from the introduction', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest({ token })

    // Load the introduction page
    cy.visit('/introduction', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check two session requests made (Ident + Timer)
    cy.expectSessionGetRequest()
    cy.expectSessionGetRequest()

    // Check the ident is rendered with returned users name
    cy.contains('Jake Elder')

    // Stub the commencement post request
    cy.route({
      method: 'POST',
      url: `/api/session/${token}/commencement`,
      status: 200,
      response: {}
    }).as('commencement-request')

    // Click continue and make sure the page is changed
    cy.contains('Continue').click()

    // Wait for the commencement request to fire
    cy.wait('@commencement-request')

    // Expect forwardings
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-1/part-1`)
    cy.contains('Section 1')
  })

  it('Shows the amount of passed time', () => {
    // Start server
    cy.server()

    // Stub the session GET request
    cy.stubSessionGetRequest({
      token,
      response: { timePassed: 1000 }
    })

    // Load the first section
    cy.visit('/section-1/part-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check two session requests made (Ident + Timer)
    cy.wait('@session-get-request').wait('@session-get-request')

    // Check the ident is rendered with returned users name
    cy.contains('Jake Elder')
    cy.get('[data-time-passed]').contains('00:01')
  })
})

describe('Token Ingestion', () => {
  context('With valid session Id', () => {
    it('Redirects to tokenless URL', () => {
      // Start server
      cy.server()

      // Stub session get request
      cy.stubSessionGetRequest({ token })

      // Load the entry point
      cy.visit(`/?token=${token}`)

      // Wait for session get request
      cy.expectSessionGetRequest()

      // Check it redirects back to root without token
      cy.url()
        .should('eq', `${Cypress.config().baseUrl}/`)
        .then(() => {
          // Token should be saved to local storage
          expect(localStorage.getItem('sid')).to.equal(token)
        })
    })

    it('Redirects to introduction', () => {
      // Start server
      cy.server()

      // Stub session get request
      cy.stubSessionGetRequest({ token })

      // Load the entry point
      cy.visit(`/`, {
        onBeforeLoad(win) {
          win.localStorage.setItem('sid', token)
        }
      })

      // Wait for session get request
      cy.expectSessionGetRequest()

      // Check it redirects back to root without token
      cy.url().should('eq', `${Cypress.config().baseUrl}/introduction`)
    })
  })

  context('With invalid session Id', () => {
    it('Redirects to tokenless URL', () => {
      // Start server
      cy.server()

      // Stub session get request
      cy.stubSessionGetRequest({ token, status: 404 })

      // Load the entry point
      cy.visit(`/?token=${token}`)

      // Wait for session get request
      cy.expectSessionGetRequest()

      // Check it redirects back to root without token
      cy.url()
        .should('eq', `${Cypress.config().baseUrl}/`)
        .then(() => {
          // Token should be null
          expect(localStorage.getItem('sid')).to.be.null
        })
    })

    it('Redirects to /test-unavailable', () => {
      // Start server
      cy.server()

      // Load the entry point
      cy.visit(`/`)

      // Check it redirects back to root without token
      cy.url().should('eq', `${Cypress.config().baseUrl}/test-unavailable`)
    })
  })
})
