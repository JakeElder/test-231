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

function absUrl(url) {
  return `${Cypress.config().baseUrl}${url}`
}

describe('Auth', () => {
  context.only('Index page', () => {
    context('With token in query', () => {

      context('With invalid token in query', () => {
        it('Redirects to / leaving the localStorage sid undefined', () => {
          cy.server()
          cy.stubSessionGetRequest({ token, status: 404 })
          cy.visit(`/?token=${token}`)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.url().should('eq', absUrl('/')).then(() => {
            cy.expectLocalStorageToken(null)
          })
        })
      })

      context('With valid token in query', () => {
        it('Sets the token in local storage and redirects to /', () => {
          cy.server()
          cy.stubSessionGetRequest({ token })
          cy.visit(`/?token=${token}`)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.url().should('eq', absUrl('/')).then(() => {
            cy.expectLocalStorageToken(token)
          })
        })
      })

    })

    context('Without token in query', () => {
      context('Without token in local storage', () => {
        it.only('Redirects to /test-unavailable', () => {
          cy.server()
          cy.visit(`/`)
          cy.url().should('eq', absUrl('/test-unavailable'))
        })
      })
      context('With valid token in local storage', () => {
        it('Redirects to /introduction', () => {})
      })
    })
  })

  context('Test unavailable page', () => {
    context('Without valid token in local storage', () => {
      it('Stays on /test-unavailable', () => {})
    })
    context('With valid token in local storage', () => {
      it('Redirects to /introduction', () => {})
    })
  })

  context('Auth required pages', () => {
    context('Without valid token in local storage', () => {
      it('Redirects to /test-unavailable', () => {})
    })
    context('With valid token in local storage', () => {
      it('Renders the section', () => {})
    })
  })
})
