describe('Expenses API Tests', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/auth/signin',
      body: {
        email: Cypress.env('username'),
        password: Cypress.env('password'),
        remember: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Server response:', response.body);

      const rememberMeCookie = response.headers['set-cookie']
        ?.find((cookie) => cookie.startsWith('remember_me='))
        ?.split(';')[0]
        ?.split('=')[1];

      if (rememberMeCookie) {
        cy.setCookie('remember_me', rememberMeCookie);
        cy.wrap(rememberMeCookie).as('rememberMeToken');
      } else {
        throw new Error('Не вдалося отримати remember_me з cookies');
      }
    });
  });

  it('should add fuel expense via API and validate it', function () {
    cy.get('@rememberMeToken').then((rememberMeToken) => {
      // Отримуємо список автомобілів
      cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        headers: {
          Cookie: `remember_me=${rememberMeToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length.greaterThan(0);

        const car = response.body.data[0]; // Беремо перший доступний автомобіль
        const carId = car.id;
        let carCreationDate;

        if (car.createdAt) {
          try {
            carCreationDate = new Date(car.createdAt).toISOString().split('T')[0]; // Отримуємо дату створення авто
          } catch (error) {
            cy.log('Помилка при обробці createdAt:', error);
            carCreationDate = new Date().toISOString().split('T')[0]; // Використовуємо поточну дату як fallback
          }
        } else {
          cy.log('createdAt не знайдено, використовується поточна дата.');
          carCreationDate = new Date().toISOString().split('T')[0];
        }

        cy.wrap(carId).as('carId');
        cy.wrap(carCreationDate).as('carCreationDate');
      });
    });

    cy.get('@carId').then((carId) => {
      cy.get('@carCreationDate').then((carCreationDate) => {
        cy.get('@rememberMeToken').then((rememberMeToken) => {
          // Додаємо витрату
          cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/expenses',
            headers: {
              Cookie: `remember_me=${rememberMeToken}`,
            },
            body: {
              carId: carId,
              reportedAt: carCreationDate, // Використовуємо дату створення авто або поточну
              mileage: 300,
              liters: 150,
              totalCost: 3000,
              forceMileage: false,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');
            expect(response.body.data).to.have.property('id');

            const expenseId = response.body.data.id;
            cy.wrap(expenseId).as('expenseId');
          });
        });
      });
    });

    // Перевіряємо, що витрати додано
    cy.get('@expenseId').then((expenseId) => {
      cy.get('@rememberMeToken').then((rememberMeToken) => {
        cy.request({
          method: 'GET',
          url: `https://qauto.forstudy.space/api/expenses/${expenseId}`,
          headers: {
            Cookie: `remember_me=${rememberMeToken}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.mileage).to.eq(300);
          expect(response.body.data.liters).to.eq(150);
          expect(response.body.data.totalCost).to.eq(3000);
        });
      });
    });
  });
});
