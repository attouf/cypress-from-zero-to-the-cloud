

describe('test1', () => {
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })
  it('passes', () => {
    
    cy.title().should("eq","TAT Customer Service Center")
  })
  it("required fields", ()=> {
    cy.get('#firstName').type("atef")
    cy.get('#lastName').type("atef")
    cy.get('#email').type("atef@gmail.com")
    cy.get('#phone').type("22222222")
    cy.get('#open-text-area').type("Bonjour ")
    cy.get('.button').click()
    cy.get('.success').should("be.visible")
  })
  it("erreur du mail fields", ()=> {
    cy.get('#firstName').type("atef")
    cy.get('#lastName').type("atef")
    cy.get('#email').type("atef@gmail,com")
    cy.get('#phone').type("22222222")
    cy.get('#open-text-area').type("Bonjour ")
    cy.get('.button').click()
    cy.get('.error').should("be.visible")
  })
  it("erreur du phone  fields", ()=> {
    cy.get('#phone').type("abcde").should('have.value','')
  })
  it("erreur du phonecheckbox fields", ()=> {
    cy.get('#phone-checkbox').click()
    cy.get('#firstName').type("atef")
    cy.get('#lastName').type("atef")
    cy.get('#email').type("atef@gmail,com")
    cy.get('#open-text-area').type("Bonjour ")
    cy.get('.button').click()
    cy.get('.error').should("be.visible")

  })
  it("clear a field ",() =>{
    cy.get('#firstName').type("atef").clear()

  })
  it('afficher un messge derreur si les champs obligatoires sont vides', ()=>{
    cy.get('.button').click()
    cy.get('.error').should("be.visible")

  })
  it('selectionner un boutton', ()=>{
    cy.contains('button','Send').click()
    

  })
  it('selectionner une valeur dune liste deroulante', ()=>{
    cy.get('#product').select(1).should('have.value','blog')
    

  })
  it('selectionner un boutton radio', ()=>{
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
    

  })
  it('tester tous les  boutton radio', ()=>{
    cy.get('input[type="radio"]')
    .each(element => {
      cy.wrap(element).check().should('be.checked')
      
    })
  })
    
    it('tester tous les cases à cocher', ()=>{
      cy.get('input[type="checkbox"]')
        .eq(1)
        .check()
        .should('be.checked')
      })
      
      it('uploder un fichier ', ()=>{
        cy.fixture('example.json').as('nom_fichier')
        cy.get('#file-upload').selectFile('@nom_fichier').then(input=>{
          console.log(input)
          cy.wrap(input[0].files[0].name).should('be.equal','example.json')

        })
      })
      it('tester un lien vers une autre page ', ()=>{
          
          cy.contains('a','Privacy')
          .should('have.attr','href','privacy.html')
          .and('have.attr','target','_blank')
  
        })
        it.only('tester un lien vers une autre page eliminer le targer ', ()=>{
          
          cy.contains('a','Privacy')
          .invoke('removeAttr','target')
          .click()
          cy.get('h1')
          .should('have.text','TAT CSC - Privacy Policy')
        })
})