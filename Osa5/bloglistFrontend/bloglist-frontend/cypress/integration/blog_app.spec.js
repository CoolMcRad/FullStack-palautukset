describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Pekka Puupää',
      username: 'Kalja Keisari',
      password: 'aabeeceedee'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Etusivulla login formi', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login to application')
  })

  it('Voi kirjautua sisään', function() {
    cy.get('#username').type('Kalja Keisari')
    cy.get('#password').type('aabeeceedee')
    cy.get('#login-button').click()

    cy.contains('logged in as Pekka Puupää')
  })

  it('login failaa väärällä passwordilla', function() {
    cy.get('#username').type('Kalja Keisari')
    cy.get('#password').type('eieiei')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong username/password')
    cy.get('html').should('not.contain', 'logged in as Pekka Puupää')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Kalja Keisari', password: 'aabeeceedee' })
    })

    it('Voi tehdä blogin', function() {
      cy.contains('create new').click()
      cy.get('#title').type('Testaan testejä')
      cy.get('#author').type('Tes Taaja')
      cy.get('#url').type('www.testintesti.org')
      cy.contains('Create').click()

      cy.contains('Testaan testejä Tes Taaja')
    })

    describe('blogille voi antaa likejä', function () {
      beforeEach(function () {
        cy.contains('create new').click()
        cy.get('#title').type('Testaan testejä')
        cy.get('#author').type('Tes Taaja')
        cy.get('#url').type('www.testintesti.org')
        cy.contains('Create').click()
      })

      it('like nousee yhdellä', function () {
        cy.contains('show').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })
    })
    describe('Oman blogin voi poistaa', function () {
      beforeEach(function () {
        cy.contains('create new').click()
        cy.get('#title').type('Testaan testejä')
        cy.get('#author').type('Tes Taaja')
        cy.get('#url').type('www.testintesti.org')
        cy.contains('Create').click()
      })

      it('Blogi poistuu', function () {
        cy.contains('show').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'Testaan testejä Tes Taaja')
      })
    })
    describe('Järjestys', function () {
      beforeEach(function () {
        cy.contains('create new').click()
        cy.get('#title').type('Myös Testejä')
        cy.get('#author').type('Tes Taaja')
        cy.get('#url').type('www.testintesti.org')
        cy.contains('Create').click()
        cy.get('#title').type('Myös Testaan')
        cy.get('#author').type('Aja Atset')
        cy.get('#url').type('www.testejätestaantesteillä.org')
        cy.contains('Create').click()
      })

      it.only('Järjestys muuttuu likejen mukaan', function () {
        cy.contains('Myös').should('contain', 'Myös Testejä Tes Taaja')
        cy.contains('Myös Testaan Aja Atset').parent().find('button').contains('show').click()
        cy.contains('www.testejätestaantesteillä.org').parent().find('button').contains('like').click()
        cy.contains('Myös').should('not.contain', 'Myös Testejä Tes Taaja')
        cy.contains('Myös').should('contain', 'Myös Testaan Aja Atset')
        
      })
    })
  })
})