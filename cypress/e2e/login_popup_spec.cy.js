describe('Перевірка попапу входу', () => {
  beforeEach(() => {
    cy.visit('/'); // Відвідуємо головну сторінку
  });

  it('Перевірка наявності кнопки "Sign In"', () => {
    cy.get('.header_signin').should('be.visible');
  });

  it('Перевірка відкриття попапу після натискання кнопки "Sign In"', () => {
    cy.get('.header_signin').click();
    cy.get('#signinEmail').should('be.visible');
    cy.get('#signinPassword').should('be.visible');
    cy.get('.btn-primary').should('be.visible');
  });

  it('Перевірка наявності полів вводу та кнопки "Login" у попапі', () => {
    cy.get('.header_signin').click();
    cy.get('#signinEmail').should('have.attr', 'type', 'text');
    cy.get('#signinPassword').should('have.attr', 'type', 'password');
    cy.get('.btn-primary').should('contain.text', 'Login');
  });

  it('Перевірка поведінки кнопки "Login"', () => {
    cy.get('.header_signin').click();

    // Перевірка, що кнопка "Login" деактивована
    cy.get('.btn-primary').should('be.disabled');

    // Введення коректних даних
    cy.get('#signinEmail').type('testuser@example.com');
    cy.get('#signinPassword').type('ValidPassword123');
    cy.get('.btn-primary').should('not.be.disabled');

    // Введення некоректних даних
    cy.get('#signinEmail').clear().type('invalidemail');
    cy.get('#signinPassword').clear().type('short');
    cy.get('.btn-primary').should('be.disabled');
  });

  it('Перевірка закриття попапу', () => {
    cy.get('.header_signin').click();
    cy.get('.close').click(); // Припускаємо, що кнопка закриття має клас 'close'
    cy.get('#signinEmail').should('not.exist');
    cy.get('#signinPassword').should('not.exist');
  });

it('Успішний вхід з правильними даними та повторне відкриття попапу', () => {
  // Відкриваємо попап входу
  cy.get('.header_signin').click();

  // Вводимо правильні дані
  cy.get('#signinEmail').type('email3@domain.com');
  cy.get('#signinPassword').type('Qa123456!', { sensitive: true });

  // Перевіряємо, що кнопка "Login" активна
  cy.get('button.btn-primary').should('not.be.disabled');

  // Натискаємо кнопку "Login"
  cy.contains('button', 'Login').click();

  // Перевіряємо, що після входу користувач перенаправлений на потрібну сторінку
  cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
  // Перевіряємо, що кнопка "Log out" доступна
  cy.contains('Log out').should('be.visible');

  // Виходимо з облікового запису
  cy.contains('Log out').click();

  // Перевіряємо, що після виходу користувач перенаправлений на головну сторінку
  cy.url().should('eq', 'https://qauto.forstudy.space/');

  // Відкриваємо попап входу знову
  cy.get('.header_signin').click();

  // Перевіряємо, що поля вводу та кнопка "Login" знову доступні
  cy.get('#signinEmail').should('be.visible');
  cy.get('#signinPassword').should('be.visible');
  cy.get('button.btn-primary').should('be.visible');
  });
});
