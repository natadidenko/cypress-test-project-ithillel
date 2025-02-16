class ExpensesPage {
    visit() {
      cy.visit('/panel/expenses');
    }
  
    addFuelExpense(expenseDetails) {
      cy.get('button.add-expense').click();
      cy.get('input[name="amount"]').type(expenseDetails.amount);
      cy.get('input[name="date"]').type(expenseDetails.date);
      cy.get('button[type="submit"]').click();
    }
  
    verifyExpenseExists(amount) {
      cy.contains(amount).should('be.visible');
    }
  }
  
  export default new ExpensesPage();
  