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

  describe('Sisäänkirjautuneena', function() {
    beforeEach(function() {
      cy.login({ username: 'meikalainen', password: 'salainen123' })
    })

    it('blogin luominen onnistuu', function() {
      cy.contains('Luo uusi').click()
      cy.get('#blogtitle').type('Blogipostaus luotu Cypressilla')
      cy.get('#blogauthor').type('Meikäläinen Matti')
      cy.get('#blogurl').type('http://localhost:3000')
      cy.contains('Luo uusi blogi').click()

      cy.contains('Blogipostaus luotu Cypressilla')
    })
  })

  describe('Kun blogipostaus on luotu', function() {
    beforeEach(function() {
      cy.login({ username: 'meikalainen', password: 'salainen123' })
      cy.contains('Luo uusi').click()
      cy.get('#blogtitle').type('Blogipostaus luotu Cypressilla')
      cy.get('#blogauthor').type('Meikäläinen Matti')
      cy.get('#blogurl').type('http://localhost:3000')
      cy.contains('Luo uusi blogi').click()
    })

    it('blogin tykkäys onnistuu', function() {
      cy.contains('Avaa').click()
      cy.contains('Tykkää').click()
      cy.contains('Tykkää').click()
      cy.contains('Tykkää').click()
      cy.contains('Tykkäykset: 1')
    })

    it('sen poistaminen onnistuu', function() {
      cy.contains('Avaa').click()
      cy.contains('Poista').click()
      cy.get('.ilmoitus')
        .should('contain', 'Blogi poistettiin!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Blogipostaus luotu Cypressilla')
    })
  })

})
