describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Kirjautumislomake näkyvissä', function() {
    cy.contains('käyttäjätunnus')
    cy.get('#username')
    cy.contains('salasana')
    cy.get('#password')
    cy.contains('kirjaudu sisään')
  })
})
