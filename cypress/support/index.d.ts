declare module 'cypress-mochawesome-reporter/register'

declare namespace Cypress {
  interface Chainable {
    /**
     * @example cy.closeAllFlashMessages()
     */
    closeAllFlashMessages(): Cypress.Chainable<any>

    /**
     * @example cy.createNewCart()
     */
    createNewCart(): Cypress.Chainable<any>

    /**
     * * @example cy.triggerOmsTransition('/path/to/spryker/env')
     */
    triggerOmsTransition(path?: string): Cypress.Chainable<any>

    /**
     * * @example cy.deleteAllCustomerAddresses('sonia@spryker.com','change123','DE--21')
     */
    deleteAllCustomerAddresses(
      email: string,
      password: string,
      customerReference: string
    ): Cypress.Chainable<any>

    /**
     * * @example cy.deleteAllShoppingCarts('sonia@spryker.com','change123')
     */
    deleteAllShoppingCarts(
      email: string,
      password: string
    ): Cypress.Chainable<any>

    /**
     * * @example cy.triggerOmsEvent('DE--1', 'Pay')
     */
    triggerOmsEvent(
      orderReference: string,
      eventName: string
    ): Cypress.Chainable<any>

    /**
     * * @example cy.waitForOrderProcessing('sent to merchant', 20)
     */
    waitForOrderProcessing(
      desiredStatus: string,
      maxRetries: number
    ): Cypress.Chainable<any>

    /**
     * @example cy.formatDisplayPrice(8999)
     */
    formatDisplayPrice(price: number): Cypress.Chainable<string>
  }
}
