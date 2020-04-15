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

Cypress.Commands.add('stubSessionGetRequest', () => {
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
})

Cypress.Commands.add('expectSessionGetRequest', ({ bearerToken }) => {
  cy.wait('@session-get-request').then(({ request }) => {
    expect(request.headers).to.include({
      Authorization: `Bearer: ${bearerToken}`
    })
  })
})
