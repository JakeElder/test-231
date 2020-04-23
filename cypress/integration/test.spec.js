const token = '0044-jjkl'

describe('Entry Process', () => {
  context('When using an invalid token', () => {
    it('Shows the test unavailable page', () => {
      cy.server()

      cy.stubSessionGetRequest({ token, status: 404 })

      cy.visit(`?token=${token}`)
      cy.get('[data-page=loading-page]').should('exist')

      cy.expectSessionGetRequest().then(() => {
        // Make sure sid isn't saved
        expect(localStorage.getItem('sid')).to.equal(null)
      })

      cy.url().should('eq', `${Cypress.config().baseUrl}/test-unavailable`)
      cy.contains('Test Unavailable')
    })
  })

  context('When using a valid token', () => {
    it('Shows the introduction page', () => {
      // Start a server to enable mocks
      cy.server()

      // Stub session request
      cy.stubSessionGetRequest({ token })

      // Check the loading page shows when navigating to the root
      cy.visit(`?token=${token}`)
      cy.get('[data-page=loading-page]').should('exist')

      // Check the same token is sent for the session request call
      cy.expectSessionGetRequest().then(() => {
        // Make sure sid is saved
        expect(localStorage.getItem('sid')).to.equal(token)
      })

      // Check we redirect to the introduction page
      cy.url().should('eq', `${Cypress.config().baseUrl}/introduction`)
      cy.contains('Introduction')
    })
  })
})

describe('Beginning the Test', () => {
  it('Shows the section 1 test page', () => {
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

    // Check the session request is made
    cy.expectSessionGetRequest()

    // Check the ident is rendered with returned users name
    cy.contains('Jake Elder')

    // Click continue and make sure the page is changed
    cy.contains('Continue').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-1/part-1`)
    cy.contains('Section 1')
    cy.contains('part 1')
  })
})

describe('Completing Section 1 [Part 1]', () => {
  it('Sends the correct data and redirects to part 2', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest({ token })

    // Load Section 1 Part 1
    cy.visit('/section-1/part-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check the session request is made
    cy.expectSessionGetRequest()

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with question
    cy.get('[data-question=1]').within(() => {
      cy.contains('Which').click()
      cy.contains('you').click()
    })
    cy.get('[data-question=2]').within(() => {
      cy.contains('driving').click()
    })
    cy.get('[data-question=3]').within(() => {
      cy.contains('Now').click()
      cy.contains('ride').click()
    })

    // Stub answer submission
    cy.stubAnswerSubmission({
      token,
      as: 'answer-submission',
      delay: 150
    })

    // Press submit and make sure it's disabled after
    cy.get('button')
      .click()
      .should('have.attr', 'disabled', 'disabled')

    // Check the answer request has the correct data sent
    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body).to.deep.equal({
        'section-id': 'section-1-part-1',
        'answer-1': ['Which', 'you'],
        'answer-2': ['driving'],
        'answer-3': ['Now', 'ride']
      })
    })

    // On to Section 1 Part 2
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-1/part-2`)
    cy.contains('Section 1')
    cy.contains('part 2')
  })
})

describe('Completing Section 1 [Part 2]', () => {
  it('Sends the correct data and redirects to section 2', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest({ token })

    // Load Section 1 Part 2
    cy.visit('/section-1/part-2', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with question
    cy.get('[data-question=1]').within(() => {
      cy.contains('What').click()
    })
    cy.get('[data-question=2]').within(() => {
      cy.contains('Both').click()
      cy.contains('weight').click()
    })
    cy.get('[data-question=3]').within(() => {
      cy.contains('have').click()
      cy.contains('bicycle').click()
    })

    // Stub answer submission
    cy.stubAnswerSubmission({
      token,
      as: 'answer-submission',
      delay: 150
    })

    // Submit
    cy.get('button').click()

    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body).to.deep.equal({
        'section-id': 'section-1-part-2',
        'answer-1': ['What'],
        'answer-2': ['Both', 'weight'],
        'answer-3': ['have', 'bicycle']
      })
    })

    // On to Section 2
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-2`)
    cy.contains('Section 2')
  })
})

describe('Completing Section 2', () => {
  it('Sends the correct data and redirects to section 3', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest({ token })

    // Load Section 2
    cy.visit('/section-2', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with question
    cy.get('[data-question=1]').within(() => {
      cy.get('[data-space-input]:eq(1)').click()
    })
    cy.get('[data-question=2]').within(() => {
      cy.get('[data-space-input]:eq(5)').click()
      cy.get('[data-space-input]:eq(2)').click()
    })
    cy.get('[data-question=3]').within(() => {
      cy.get('[data-space-input]:eq(6)').click()
    })

    // Stub answer submission
    cy.stubAnswerSubmission({ token, as: 'answer-submission' })

    // Submit
    cy.get('button').click()

    // Check the answer request has the correct data sent
    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body).to.deep.equal({
        'section-id': 'section-2',
        'answer-1': ['1'],
        'answer-2': ['2', '5'],
        'answer-3': ['6']
      })
    })

    // On to Section 3
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-3`)
    cy.contains('Section 3')
  })
})

describe('Completing Section 3', () => {
  it('Sends the correct data and redirects to section 4', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest({ token })

    // Load Section 3
    cy.visit('/section-3', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with questions
    cy.get('[data-sentence=1]').within(() => {
      cy.contains('Hon').click()
      cy.contains('best').click()
    })
    cy.get('[data-sentence=2]').within(() => {
      cy.contains('New').click()
      cy.contains('win').click()
    })
    cy.get('[data-sentence=3]').within(() => {
      cy.contains('home').click()
      cy.contains('work').click()
    })
    // Stub answer submission
    cy.stubAnswerSubmission({ token, as: 'answer-submission' })

    // Submit
    cy.get('button').click()

    // Check the answer request has the correct data sent
    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body).to.deep.equal({
        'section-id': 'section-3',
        'answer-1': ['Hon', 'best'],
        'answer-2': ['New', 'win'],
        'answer-3': ['home', 'work']
      })
    })

    // On to Section 4
    cy.url().should('eq', `${Cypress.config().baseUrl}/section-4`)
    cy.contains('Section 4')
  })
})

describe('Completing Section 4', () => {
  it('Sends the correct data and redirects to the summary', () => {
    // Start server
    cy.server()

    // Stub session get request
    cy.stubSessionGetRequest({ token })

    // Load Section 4
    cy.visit('/section-4', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sid', token)
      }
    })

    // Check required content exists
    cy.get('[data-component=ident]').contains('Jake Elder')

    // Interact with questions
    cy.get('[data-line=2]').within(() => {
      cy.get('[data-rising-tone-input]:eq(0)').click()
      cy.get('[data-level-tone-input]:eq(1)').click()
    })
    cy.get('[data-line=3]').within(() => {
      cy.get('[data-level-tone-input]:eq(0)').click()
      cy.get('[data-falling-tone-input]:eq(1)').click()
    })
    cy.get('[data-line=4]').within(() => {
      cy.get('[data-falling-tone-input]').click()
    })
    cy.get('[data-line=5]').within(() => {
      cy.get('[data-rising-tone-input]').click()
    })

    // Stub answer submission
    cy.stubAnswerSubmission({ token, as: 'answer-submission' })

    // Submit
    cy.get('button').click()

    // Check the answer request has the correct data sent
    cy.wait('@answer-submission').then(({ request }) => {
      expect(request.body).to.deep.equal({
        'section-id': 'section-4',
        'answer-1': 'rising',
        'answer-2': 'level',
        'answer-3': 'level',
        'answer-4': 'falling',
        'answer-5': 'falling',
        'answer-6': 'rising'
      })
    })

    // On to Summary
    cy.url().should('eq', `${Cypress.config().baseUrl}/summary`)
    cy.contains('Summary')
  })
})
