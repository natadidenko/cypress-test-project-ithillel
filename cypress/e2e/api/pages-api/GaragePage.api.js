class GaragePage {
  visit() {
    cy.visit('/panel/garage');
  }

  addCar(carDetails) {
    cy.contains('button', 'Add car').click();
    cy.get('app-add-car-form').should('be.visible');
    cy.get('select[name="carBrandId"]').select(carDetails.brand);
    cy.get('select[name="carModelId"]').select(carDetails.model);
    cy.get('input[name="mileage"]').type(carDetails.mileage);
    cy.get('.modal-footer > .btn-primary').click({ force: true });
  }

  verifyCarExists(brand, model) {
    cy.contains(`${brand} ${model}`).should('be.visible');
  }
}

export default new GaragePage();
