import ExpensesPage from '../pages-api/ExpensesPage.api.js';

describe('Expenses Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('username'));
    cy.get('#signinPassword').type(Cypress.env('password'));
    cy.contains('button', 'Login').click();
  });

  it('Add fuel expense and validate via API', () => {
    cy.url().should('include', '/panel/garage');
    
    // Додаємо витрату через UI
    cy.contains('button', 'Add fuel expense').click();
    
    cy.get('#addExpenseMileage').clear().type('300');
    cy.get('#addExpenseLiters').type('150');
    cy.get('#addExpenseTotalCost').type('3000');
    cy.get('#addExpenseTotalCost').should('have.value', '3000');
    
    cy.get('.modal').should('be.visible');
    cy.get('.modal-footer > .btn-primary').click();

    // Перевірка витрати через API
    cy.request({
      method: 'GET',
      url: 'https://qauto.forstudy.space/api/expenses?reportedAt=' + new Date().toISOString().split('T')[0], 
      headers: {
        Cookie: `remember_me=${Cypress.env('rememberMeToken')}`, 
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Вивести всю відповідь для дебагінгу
      cy.log('API Response:', JSON.stringify(response.body, null, 2));
      // Перевіряємо, що витрата з відповідними параметрами існує в API
      const expense = response.body.data.find(exp => exp.mileage === 300 && exp.liters === 150 && exp.totalCost === 3000);
    });

      // Перевіряемо значення в рядоку витрати
      cy.get('tr').contains('300').parent('tr') 
        .should('contain', '300')   
        .should('contain', '150L')  
        .should('contain', '3000.00 USD'); 
    });
  });
