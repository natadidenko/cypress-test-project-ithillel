Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://qauto.forstudy.space/api/auth/signin',
    body: { email, password, remember: true },
  }).then((response) => {
    expect(response.status).to.eq(200); // Перевіряємо, що статус відповіді 200

    const token = response.body.data.accessToken;
    const rememberMeValue = response.body.data.remember_me; // Це має бути рядок

    // Додаємо логування для перевірки значень
    cy.log('Token:', token);
    cy.log('Remember Me Value:', rememberMeValue);

    // Перевірка, чи це рядки
    expect(token).to.be.a('string');
    expect(rememberMeValue).to.be.a('string');

    // Записуємо cookie
    cy.setCookie('auth_token', token);  // Токен
    cy.setCookie('remember_me', rememberMeValue);  // Remember Me

    cy.wrap(token).as('authToken'); // Зберігаємо токен як alias

    // Переходимо на панель без входу через UI
    cy.visit('/panel');

    // Перевірка, що ми авторизовані
    cy.get('.user-profile-name').should('exist');
  });
});



// Додаємо команду для отримання токена з cookies
Cypress.Commands.add('getAuthTokenFromCookie', () => {
  cy.getCookie('auth_token').should('exist').then((cookie) => {
    cy.wrap(cookie.value).as('authToken');
  });
});

// Додаємо команду для отримання токена з localStorage
Cypress.Commands.add('getAuthTokenFromLocalStorage', () => {
  cy.window().then((window) => {
    const token = window.localStorage.getItem('auth_token');
    cy.wrap(token).as('authToken');
  });
});

// Додаємо команду для виходу
Cypress.Commands.add('logout', () => {
  cy.get('.user-profile-name').click();
  cy.contains('Sign out').click();
  cy.url().should('eq', 'https://qauto.forstudy.space/');
});

// Створення витрати
Cypress.Commands.add('createExpense', (expenseDetails) => {
  cy.get('@authToken').then((token) => {
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/expenses',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        carId: expenseDetails.carId, // ID машини
        reportedAt: expenseDetails.reportedAt,
        mileage: expenseDetails.mileage,
        liters: expenseDetails.liters,
        totalCost: expenseDetails.totalCost,
        forceMileage: expenseDetails.forceMileage || false,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.data).to.have.property('id');
      cy.wrap(response.body.data.id).as('expenseId'); // Збереження id витрат
    });
  });
});

// Поліпшена команда для безпечного введення паролів
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
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