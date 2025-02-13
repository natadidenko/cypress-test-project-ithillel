import ExpensesPage from '../pages/ExpensesPage';

describe('Expenses Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('username'));
    cy.get('#signinPassword').type(Cypress.env('password'));
    cy.contains('button', 'Login').click();
  });

  it('Add fuel expense', () => {
    cy.url().should('include', '/panel/garage');
    
    cy.contains('button', 'Add fuel expense').click();
    
    cy.get('#addExpenseMileage').clear().type('300');
    cy.get('#addExpenseLiters').type('150');
    cy.get('#addExpenseTotalCost').type('3000');
    cy.get('#addExpenseTotalCost').should('have.value', '3000');
    
    cy.get('.modal').should('be.visible');
    cy.get('.modal-footer > .btn-primary').click();
  });  
});
