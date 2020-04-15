Cypress.Commands.add('stubSessionRequest', ({ status, response } = {}) => {
  cy.route({
    method: 'post',
    url: '/api/session',
    status,
    response
  }).as('session-request')
})

Cypress.Commands.add('expectSessionRequest', ({ token }) => {
  cy.wait('@session-request').then(({ request }) => {
    expect(request.body).to.include({ token })
    expect(request.headers, 'request headers').to.include({
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    })
  })
})
