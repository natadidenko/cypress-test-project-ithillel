import GaragePage from '../pages/GaragePage';

describe('Garage Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('username'));
    cy.get('#signinPassword').type(Cypress.env('password'));
    cy.contains('button', 'Login').click();
  });

  describe('Add car to garage', () => {
    it('should add a new car to the garage', () => {
      // Перевірка, що URL змінився на очікуваний
      cy.url().should('include', '/panel/garage');
      
      // Додавання машини
      GaragePage.visit();
      GaragePage.addCar({ brand: 'Audi', model: 'TT', mileage: '250' });

      // Перевірка, що машина додалась
      //cy.contains('Audi TT').should('be.visible');
    });
  });
});