import GaragePage from '../pages-api/GaragePage.api';

describe('Garage Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('username'));
    cy.get('#signinPassword').type(Cypress.env('password'));
    cy.contains('button', 'Login').click();

    // Очікуємо завантаження сторінки гаражу
    cy.url().should('include', '/panel/garage');
    cy.get('h1').should('contain', 'Garage'); // Перевіряємо заголовок сторінки
  });

  describe('Add car to garage', () => {
    it('should add a new car to the garage', () => {
      // Перехоплення запиту на створення машини
      cy.intercept('POST', 'https://qauto.forstudy.space/api/cars').as('createCar'); 

      // Додавання машини
      GaragePage.visit(); 
      cy.url().should('include', '/panel/garage'); 

      // Чекаємо, поки не зникне попереднє модальне вікно (якщо було відкрите)
      cy.get('ngb-modal-window').should('not.exist');

      // Переконуємося, що кнопка "Add car" видима перед кліком
      cy.contains('button', 'Add car').should('be.visible').click();

      // Чекаємо, поки з'явиться форма додавання машини
      cy.get('app-add-car-form').should('be.visible');

      // Вибираємо бренд і модель
      cy.get('select[name="carBrandId"]').select('Audi');
      cy.get('select[name="carModelId"]').select('TT');

      // Очистка та заповнення пробігу, якщо він не встановився
      cy.get('input[name="mileage"]').should('be.visible').clear().type('250');

      // Клікаємо на кнопку "Add" у формі
      cy.get('.modal-footer > .btn-primary').click({ force: true });

      // Очікуємо на перехоплений запит і перевіряємо статус-код
      cy.wait('@createCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201); 

        // Збереження id створеної машини
        const carId = interception.response.body.data.id;
        cy.wrap(carId).as('carId'); 

        // Перевірка, що машина додалася через UI
        GaragePage.verifyCarExists('Audi', 'TT');
      });
    });
  });
});
