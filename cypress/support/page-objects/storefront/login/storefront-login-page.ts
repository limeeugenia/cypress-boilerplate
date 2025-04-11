import { AbstractPage } from '../../abstract-page'

const loginForm = '.main-login-form form[name="loginForm"]'

export class StorefrontLoginPage extends AbstractPage {
  protected PAGE_URL = Cypress.env('STOREFRONT_URL') + '/de/login'

  getEmailField = (): Cypress.Chainable => {
    return cy.get(loginForm).first().find('[name="loginForm[email]"]')
  }

  getPasswordField = (): Cypress.Chainable => {
    return cy.get(loginForm).first().find('[name="loginForm[password]"]')
  }

  login = (email: string, password: string): void => {
    cy.clearAllCookies();
    this.visit();
    this.getEmailField().clear();
    this.getEmailField().type(email);
    this.getPasswordField().clear();
    this.getPasswordField().type(password);
    cy.get(loginForm).first().submit();
  }
}
