const jwtToken = 'JWT'

describe('Entry Process', () => {
  context('When using an invalid token', () => {
    it('Shows the test unavailable page', () => {
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

  context('When using a valid token', () => {
    it('Shows the introduction page', () => {
      // Start a server to enable mocks
      cy.server()

      // Define mock tokens
      const clientToken = 'T0K3N'

      // Stub session request
      cy.stubSessionPostRequest({
        status: 200,
        response: { token: jwtToken }
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
    })
  })
})

describe('Beginning the Test', () => {
  it('Shows the section 1 test page', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest()

    // Load the introduction page
    cy.visit('/introduction', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', jwtToken)
      }
    })

    // Check the correct Authorization token is sent in the subsequent request
    cy.expectSessionGetRequest({ bearerToken: jwtToken })

    // Check the ident is rendered with returned users name
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Click continue and make sure the page is changed
    cy.get('[data-component=button]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-1/part-1`)
  })
})

describe('Completing Section 1 [Part 1]', () => {
  it('Sends the correct data and redirects to part 2', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest()

    // Load Section 1 Part 1
    cy.visit('/section-1/part-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', jwtToken)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with question
    cy.get('[value=Which]').click()
    cy.get('[value=mean]').click()

    // Stub answer submission
    cy.stubAnswerSubmission({ as: 'first-section-submission', delay: 150 })

    // Press submit and make sure it's disabled after
    cy.get('button')
      .click()
      .should('have.attr', 'disabled', 'disabled')

    // Check the answer request has the bearer token and 
    // has the correct data sent
    cy.wait('@first-section-submission').then(({ request }) => {
      expect(request.headers).to.include({
        Authorization: `Bearer: ${jwtToken}`
      })
      expect(request.body.getAll('focusWords')).to.eql(['Which', 'mean'])
    })

    // On to Section 1 Part 2
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-1/part-2`)
  })
})

describe('Completing Section 1 [Part 2]', () => {
  it('Sends the correct data and redirects to section 2', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest()

    // Load Section 1 Part 2
    cy.visit('/section-1/part-2', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', jwtToken)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with question
    cy.get('[value=What]').click()
    cy.get('[value=do]').click()

    // Submit
    cy.get('button').click()

    // On to Section 2
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-2`)
    cy.get('[data-page=section-2]').should('exist')
  })
})

describe('Completing Section 2', () => {
  it('Sends the correct data and redirects to section 3', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest()

    // Load Section 2
    cy.visit('/section-2', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', jwtToken)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with questions
    cy.get('[name="sentence-1-answers"][value=3]').click()
    cy.get('[name="sentence-1-answers"][value=5]').click()
    cy.get('[name="sentence-2-answers"][value=1]').click()

    // Stub answer submission
    cy.stubAnswerSubmission({ as: 'second-section-submission' })

    // Submit
    cy.get('button').click()

    // Check the answer request has the correct data sent
    cy.wait('@second-section-submission').then(({ request }) => {
      expect(request.body.getAll('sentence-1-answers')).to.eql(['3', '5'])
      expect(request.body.getAll('sentence-2-answers')).to.eql(['1'])
    })

    // On to Section 3
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-3`)
    cy.get('[data-page=section-3]').should('exist')
  })
})

describe('Completing Section 3', () => {
  it('Sends the correct data and redirects to section 4', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest()

    // Load Section 3
    cy.visit('/section-3', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', jwtToken)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with questions
    cy.get('[name="sentence-1-answers"][value=Hon]').click()
    cy.get('[name="sentence-1-answers"][value=po]').click()

    // Stub answer submission
    cy.stubAnswerSubmission({ as: 'answer-submission' })

    // Submit
    cy.get('button').click()

    // Check the answer request has the correct data sent
    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body.getAll('sentence-1-answers')).to.eql(['Hon', 'po'])
    })

    // On to Section 4
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-4`)
    cy.get('[data-page=section-4]').should('exist')
  })
})

describe('Completing Section 4', () => {
  it.only('Sends the correct data and redirects to the summary', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest()

    // Load Section 4
    cy.visit('/section-4', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', jwtToken)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with questions
    cy.get('[name="line-1-answer"][value=falling]').click()
    cy.get('[name="line-2-sentence-1-answer"][value=falling]').click()
    cy.get('[name="line-2-sentence-2-answer"][value=rising]').click()

    // Stub answer submission
    cy.stubAnswerSubmission({ as: 'answer-submission' })

    // Submit
    cy.get('button').click()

    // Check the answer request has the correct data sent
    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body.get('line-1-answer')).to.equal('falling')
      expect(request.body.get('line-2-sentence-1-answer')).to.equal('falling')
      expect(request.body.get('line-2-sentence-2-answer')).to.equal('rising')
    })

    // On to Summary
    cy.url().should('eq', `${Cypress.config().baseUrl}/summary`)
    cy.get('[data-page=summary]').should('exist')
  })
})