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
  context('Index page', () => {
    context('With token in query', () => {
      context('With invalid token in query', () => {
        it('Redirects to / leaving the localStorage sid undefined', () => {
          cy.server()
          cy.stubSessionGetRequest({ token, status: 404 })
          cy.visit(`/?token=${token}`)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.url()
            .should('eq', absUrl('/'))
            .then(() => {
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
          cy.url()
            .should('eq', absUrl('/'))
            .then(() => {
              cy.expectLocalStorageToken(token)
            })
        })
      })
    })

    context('Without token in query', () => {
      context('Without token in local storage', () => {
        it('Redirects to /test-unavailable', () => {
          cy.server()
          cy.visit(`/`)
          cy.get('[data-page=loading-page]').should('exist')
          cy.url().should('eq', absUrl('/test-unavailable'))
        })
      })

      context('With invalid token in local storage', () => {
        it('Redirects to /test-unavailable', () => {
          cy.server()
          cy.stubSessionGetRequest({ token, status: 404 })
          cy.visitWithToken(`/`, token)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.url().should('eq', absUrl('/test-unavailable'))
        })
      })

      context('With valid token in local storage', () => {
        it('Redirects to /introduction', () => {
          cy.server()
          cy.stubSessionGetRequest({ token })
          cy.visitWithToken(`/`, token)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.url().should('eq', absUrl('/introduction'))
        })
      })
    })
  })

  context('Test unavailable page', () => {
    context('Without token in local storage', () => {
      it('Shows the test unavailable page', () => {
        cy.server()
        cy.visit(`/test-unavailable`)
        cy.contains('Test Unavailable')
      })
    })

    context('With invalid token in local storage', () => {
      it('Shows test unavailable page', () => {
        cy.server()
        cy.stubSessionGetRequest({ token, status: 404, delay: 100 })
        cy.visitWithToken(`/test-unavailable`, token)
        cy.get('[data-page=loading-page]').should('exist')
        cy.expectSessionGetRequest()
        cy.contains('Test Unavailable')
      })
    })

    context('With valid token in local storage', () => {
      it('Redirects to /introduction', () => {
        cy.server()
        cy.stubSessionGetRequest({ token })
        cy.visitWithToken(`/test-unavailable`, token)
        cy.get('[data-page=loading-page]').should('exist')
        cy.expectSessionGetRequest()
        cy.url().should('eq', absUrl('/introduction'))
      })
    })
  })

  context('Introduction page', () => {
    context('Without token in local storage', () => {
      it('Redirects to /test-unavailable', () => {
        cy.server()
        cy.visit(`/introduction`)
        cy.url().should('eq', absUrl('/test-unavailable'))
      })
    })

    context('With invalid token in local storage', () => {
      it('Redirects to /test-unavailable', () => {
        cy.server()
        cy.stubSessionGetRequest({ token, status: 404 })
        cy.visitWithToken(`/introduction`, token)
        cy.get('[data-page=loading-page]').should('exist')
        cy.expectSessionGetRequest()
        cy.url().should('eq', absUrl('/test-unavailable'))
      })
    })

    context('With valid token in local storage', () => {
      it('Shows the introduction page', () => {
        cy.server()
        cy.stubSessionGetRequest({ token })
        cy.visitWithToken(`/introduction`, token)
        cy.get('[data-page=loading-page]').should('exist')
        cy.expectSessionGetRequest()
        cy.contains('Introduction')
      })
    })
  })

  context('Test pages', () => {
    context('Without token in local storage', () => {
      it('Redirects to /test-unavailable', () => {
        cy.server()
        cy.visit(`/section-1/part-1`)
        cy.url().should('eq', absUrl('/test-unavailable'))
      })
    })

    context('With invalid token in local storage', () => {
      it('Redirects to /test-unavailable', () => {
        cy.server()
        cy.stubSessionGetRequest({ token, status: 404 })
        cy.visitWithToken(`/section-1/part-1`, token)
        cy.get('[data-page=loading-page]').should('exist')
        cy.expectSessionGetRequest()
        cy.url().should('eq', absUrl('/test-unavailable'))
      })
    })

    context('With valid token in local storage', () => {
      context('With commenced session', () => {
        it('Shows the test page', () => {
          cy.server()
          cy.stubSessionGetRequest({
            token,
            response: {
              commenced: new Date(Date.now() - humanInterval('2 minutes'))
            }
          })
          cy.visitWithToken(`/section-1/part-1`, token)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.get('[data-component=subtitle]').contains('Section 1')
        })
      })

      context('With uncommenced session', () => {
        it('Redirects to the introduction page', () => {
          cy.server()
          cy.stubSessionGetRequest({
            token,
            response: { commenced: null }
          })
          cy.visitWithToken(`/section-1/part-1`, token)
          cy.get('[data-page=loading-page]').should('exist')
          cy.expectSessionGetRequest()
          cy.url().should('eq', absUrl('/introduction'))
        })
      })
    })
  })
})
