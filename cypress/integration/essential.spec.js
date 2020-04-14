describe('Essential', () => {
  it('returns 200 on root request', async () => {
    const response = await cy.request('/')
    expect(response.status).to.eq(200)
  })
})
