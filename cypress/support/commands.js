Cypress.Commands.add('stubSessionPostRequest', ({ status, response } = {}) => {
  cy.route({
    method: 'post',
    url: '/api/session',
    status,
    response
  }).as('session-post-request')
})

Cypress.Commands.add('expectSessionPostRequest', ({ token }) => {
  cy.wait('@session-post-request').then(({ request }) => {
    expect(request.body).to.include({ token })
    expect(request.headers).to.include({
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    })
  })
})

Cypress.Commands.add('stubSessionGetRequest', ({ token, status = 200 }) => {
  const props = (() => {
    if (status === 200) {
      return {
        status,
        response: {
          data: {
            name: 'Jake Elder',
            id: 'jake-elder'
          }
        }
      }
    }
    return {
      status: 404,
      response: {}
    }
  })()

  cy.route({
    method: 'get',
    url: `/api/session/${token}`,
    ...props
  }).as('session-get-request')
})

Cypress.Commands.add('expectSessionGetRequest', () => {
  cy.wait('@session-get-request')
})

Cypress.Commands.add('stubAnswerSubmission', ({ token, as, delay = 0 }) => {
  cy.route({
    delay,
    method: 'post',
    url: `/api/session/${token}/answers`,
    status: 200,
    response: {}
  }).as(as)
})
