/// <reference types="cypress" />

describe('LogIn', ()=>{

  beforeEach(() =>{
    cy.get('[cy=username-input]').clear()
    cy.get('[cy=password-input]').clear()
  })

  it('Failure', ()=>{
    cy.get('[cy=username-input]').type('fail')
    cy.get('[cy=password-input]').type('fail')
    cy.get('[cy=login-button]').click()
    cy.get('[cy=fail-message]').contains('Usuario/Contraseña incorrectas')
  })
  
  it('Button disabled', ()=>{
    cy.get('[cy=username-input]').type('fail')
    cy.get('[cy=login-button]').should('be.disabled')
    cy.get('[cy=username-input]').clear()
    cy.get('[cy=password-input]').type('fail')
    cy.get('[cy=login-button]').should('be.disabled')
  })

  it('Success', () => {
    cy.get('[cy=username-input]').type('mctest')
    cy.get('[cy=password-input]').type('Zero&1')
    cy.get('[cy=login-button]').click()
    cy.url().should('include', '/home')
  })
})