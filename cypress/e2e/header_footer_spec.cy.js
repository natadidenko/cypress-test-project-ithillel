describe('Тести для сторінки логіну Hillel LMS', () => {
    const selectors = {
      emailInput: '[formcontrolname="email"]',
      passwordInput: '[formcontrolname="password"]',
      submitButton: 'button[type="submit"]',
      registrationLink: 'a[href="/auth/registration"]',
      forgotPasswordLink: 'a[href="/auth/restore"]',
      supportLink: 'a[href="/support"]',
    };
  
    beforeEach(() => {
      cy.visit('https://lms.ithillel.ua/auth');
    });
  
    it('Перевіряє наявність полів для входу та кнопки "Увійти"', () => {
      cy.get('form').within(() => {
        cy.get(selectors.emailInput).as('emailInput')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Пошта');
        cy.get(selectors.passwordInput).as('passwordInput')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Пароль');
        cy.get(selectors.submitButton).as('submitButton')
          .should('be.visible')
          .and('contain', 'Увійти');
      });
    });
  
    it('Перевіряє посилання "Реєстрація" та перенаправлення', () => {
      cy.get(selectors.registrationLink).as('registrationLink')
        .should('be.visible')
        .and('have.attr', 'href', '/auth/registration');
      cy.get('@registrationLink').click();
      cy.url().should('include', '/auth/registration');
    });
  
    it('Перевіряє посилання "Забули пароль?" та перенаправлення', () => {
      cy.get(selectors.forgotPasswordLink).as('forgotPasswordLink')
        .should('be.visible')
        .and('have.attr', 'href', '/auth/restore');
      cy.get('@forgotPasswordLink').click();
      cy.url().should('include', '/auth/restore');
    });
  
    it('Перевіряє посилання "Служба підтримки" та перенаправлення', () => {
      cy.get(selectors.supportLink).as('supportLink')
        .should('be.visible')
        .and('have.attr', 'href', '/support');
      cy.get('@supportLink').click();
      cy.url().should('include', '/support');
    });
  });
  