import { BOB } from '../fixtures/members';

describe('404 Page Test', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: BOB });
  });
  it('should display 404 page for non-existing routes', () => {
    cy.visit('/non-existing-page');

    cy.url().should('include', '/non-existing-page');

    cy.get('h1').contains('404 Page not found').should('be.visible');

    cy.contains('Sorry, we could not find this page.').should('be.visible');
    cy.get('a').contains('Go to Home').should('have.attr', 'href', '/');
  });

  it('should navigate to the home page when clicking "Go to Home"', () => {
    cy.visit('/non-existing-page');
    cy.get('a').contains('Go to Home').click();

    // Check if the URL is the home page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
