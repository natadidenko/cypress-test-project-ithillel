// Додаємо команду для входу
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/'); // Відвідуємо головну сторінку або сторінку входу
    cy.contains('Sign in').click(); // Натискаємо на кнопку "Sign in"
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password, { sensitive: true });
    cy.get('button.btn.btn-primary').contains('Login').click();
    cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage'); // Перевіряємо, що ми на потрібній сторінці після входу
  });
  
  // Додаємо команду для виходу
  Cypress.Commands.add('logout', () => {
    cy.get('.user-profile-name').click(); // Натискаємо на профіль користувача
    cy.contains('Sign out').click(); // Натискаємо на кнопку "Sign out"
    cy.url().should('eq', 'https://qauto.forstudy.space/'); // Перевіряємо, що ми на головній сторінці після виходу
  });
  
  // Перевизначаємо команду type для приховування чутливих даних
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      // Вимикаємо оригінальний лог
      options.log = false;
      // Створюємо власний лог з маскованим повідомленням
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }
    return originalFn(element, text, options);
  });
  
//Cypress.Commands.add("login", (email, password) => {
//    cy.visit("/login");
//    cy.get("input[name=email]").type(email);
//    cy.get("input[name=password]").type(password);
//    cy.get("button[type=submit]").click();
//  });
  
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })