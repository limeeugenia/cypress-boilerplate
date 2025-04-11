import { AbstractPage } from '../../abstract-page'
import Chainable = Cypress.Chainable;

export class StorefrontCartPage extends AbstractPage {
  protected PAGE_URL = Cypress.env('STOREFRONT_URL') + '/en/cart'

  getCartItemsList = (): Cypress.Chainable => {
    return cy.get('.product-card-item')
  }

  getCartItem = (concreteSku: string): Cypress.Chainable => {
    return this.getCartItemsList()
      .contains('span[itemprop="sku"]', concreteSku)
      .parents('article.product-cart-item')
  }

  getCheckoutButton = (): Cypress.Chainable => {
    return cy.get('[data-qa="cart-go-to-checkout"]')
  }

  deleteCartItems() {
    this.visit()
    cy.get('body').then(($form) => {
      if ($form.find('form[name="multi_cart_clear_form"]').length) {
        $form.find('form[name="multi_cart_clear_form"]').submit()
      }
    })
  }
}
