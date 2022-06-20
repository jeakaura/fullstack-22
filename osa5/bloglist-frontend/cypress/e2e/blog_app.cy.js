describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Meikäläinen',
      username: 'meikalainen',
      password: 'salainen123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Kirjautumislomake näkyvissä', function() {
    cy.contains('käyttäjätunnus')
    cy.get('#username')
    cy.contains('salasana')
    cy.get('#password')
    cy.contains('kirjaudu sisään')
  })

  describe('Kirjautuminen',function() {
    it('onnistuu oikeilla tiedoilla', function() {
      cy.get('#username').type('meikalainen')
      cy.get('#password').type('salainen123')
      cy.get('#login-button').click()

      cy.contains('Matti Meikäläinen on kirjautunut sisään')
    })

    it('epäonnistuu väärillä tiedoilla', function() {
      cy.get('#username').type('meikalainen')
      cy.get('#password').type('hakkeri2000')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Virhe: Käyttäjätunnus tai salasana ei kelpaa')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Meikäläinen on kirjautunut sisään')
    })
  })

})
