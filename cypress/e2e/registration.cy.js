describe('Registration form validation checks', () => {
  // Генерація унікальних даних для кожного тесту
  const generateUniqueName = () => 'John';
  const generateUniqueLastName = () => 'Doe';
  const generateUniqueEmail = () => `testuser+${Date.now()}@example.com`;

  beforeEach(() => {
    cy.visit('/', { failOnStatusCode: false });
    cy.contains('Sign up').click();
    cy.log('Opened Sign Up page');
  });
  
  it('Validates the "Name" field', () => {
    cy.get('#signupName').should('be.visible');
     
    // Перевірка на порожнє поле
    cy.get('#signupName').clear().blur();
    cy.get('#signupName')
      .parent()
      .find('p')
      .should('contain.text', 'Name is required')
      .and('be.visible');
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    
    // Перевірка, що кнопка "Register" деактивована
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');

    // Перевірка на правильне ім’я
    cy.get('#signupName').clear().type(generateUniqueName()).blur();
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(206, 212, 218)');

    // Перевірка, що кнопка "Register" все ще деактивована, якщо інші поля ще не заповнені
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');
  });
  
  it('Validates the "Last Name" field', () => {
    cy.get('#signupLastName').should('be.visible');
     
    // Перевірка на порожнє поле
    cy.get('#signupLastName').clear().blur();
    cy.get('#signupLastName')
      .parent()
      .find('p')
      .should('contain.text', 'Last name is required')
      .and('be.visible');
    cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    
    // Перевірка, що кнопка "Register" деактивована
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');

    // Перевірка на правильне прізвище
    cy.get('#signupLastName').clear().type(generateUniqueLastName()).blur();
    cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(206, 212, 218)');

    // Перевірка, що кнопка "Register" все ще деактивована, якщо інші поля ще не заповнені
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');
  });
  
  it('Validates the "Email" field', () => {
    cy.get('#signupEmail').should('be.visible');
     
    // Перевірка на неправильний email (без символу @)
    cy.get('#signupEmail').clear().type('testexample.com').blur();
    cy.get('#signupEmail')
      .parent()
      .find('p')
      .should('contain.text', 'Email is incorrect')
      .and('be.visible');
    cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');

    // Перевірка, що кнопка "Register" деактивована
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');

    // Перевірка на правильний email
    cy.get('#signupEmail').clear().type(generateUniqueEmail()).blur();
    cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(206, 212, 218)');

    // Перевірка, що кнопка "Register" все ще деактивована, якщо інші поля ще не заповнені
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');
  });
  
  it('Validates the "Password" field', () => {
    cy.get('#signupPassword').should('be.visible');
     
    // Перевірка на порожнє поле
    cy.get('#signupPassword').clear().blur();
    cy.get('#signupPassword')
      .parent()
      .find('p')
      .should('contain.text', 'Password required')
      .and('be.visible');
    cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    
    // Перевірка, що кнопка "Register" деактивована
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');

    // Перевірка на правильний пароль
    cy.get('#signupPassword').clear().type('Valid1Password').blur();
    cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)');

    // Перевірка, що кнопка "Register" все ще деактивована, якщо інші поля ще не заповнені
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');
  });
  
  it('Validates the "Re-enter Password" field', () => {
    cy.get('#signupRepeatPassword').should('be.visible');
     
    // Перевірка на порожнє поле
    cy.get('#signupRepeatPassword').clear().blur();
    cy.get('#signupRepeatPassword')
      .parent()
      .find('p')
      .should('contain.text', 'Re-enter password required')
      .and('be.visible');
    cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    
    // Перевірка, що кнопка "Register" деактивована
    cy.get('button.btn.btn-primary').contains('Register').should('be.disabled');

    // Перевірка на співпадіння паролів
    cy.get('#signupPassword').clear().type('Valid1Password').blur();
    cy.get('#signupRepeatPassword').clear().type('Valid1Password').blur();
    cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)');

    // Заповнення інших полів з унікальними даними
    cy.get('#signupName').clear().type(generateUniqueName()).blur();
    cy.get('#signupLastName').clear().type(generateUniqueLastName()).blur();
    cy.get('#signupEmail').clear().type(generateUniqueEmail()).blur();

    // Перевірка, що кнопка "Register" активована після заповнення всіх полів правильно
    cy.get('button.btn.btn-primary').contains('Register').should('not.be.disabled');
    
    // Перевірка, чи перенаправляє на правильну сторінку після натискання кнопки "Register"
    cy.get('button.btn.btn-primary').contains('Register').click();
    cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
  });
});
