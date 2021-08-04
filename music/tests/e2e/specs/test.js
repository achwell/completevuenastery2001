// https://docs.cypress.io/api/introduction/api.html

describe('Sanity Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'kul musikk!');
  });
});
