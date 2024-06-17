import { AbstractPage } from '../../abstract-page'

const addressForm = 'form[name="addressesForm"]'

export class StorefrontCheckoutAddressPage extends AbstractPage {
  protected PAGE_URL = Cypress.env('STOREFRONT_URL') + '/en/checkout/address'

  getShippingAddressDropdown = (): Cypress.Chainable => {
    return cy
      .get(addressForm)
      .find('[data-qa*="checkout-full-addresses"]')
      .first()
  }

  getSalutationField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_salutation')
  }

  getFirstNameField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_first_name')
  }

  getLastNameField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_last_name')
  }

  getCompanyField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_company')
  }

  getStreetField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_address1')
  }

  getNumberField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_address2')
  }

  getAdditionalAddressField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_address3')
  }

  getCityField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_city')
  }

  getCountryField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_iso2_code')
  }

  getPhoneField = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_shippingAddress_phone')
  }

  getSaveAddressCheckbox = (): Cypress.Chainable => {
    return cy
      .get(addressForm)
      .find('#addressesForm_shippingAddress_isAddressSavingSkipped')
  }

  getBillingTheSameAsShippingCheckbox = (): Cypress.Chainable => {
    return cy.get(addressForm).find('#addressesForm_billingSameAsShipping')
  }

  getBillingAddressDropdown = (): Cypress.Chainable => {
    return cy.get(addressForm).find('[data-qa="checkout-full-addresses"]').eq(1)
  }

  selectFirstBusinessAddressAvailableForShipping = (): void => {
    this.getShippingAddressDropdown().click()
    cy.get('[id*="company_business_unit_address"]').first().click()
  }

  submitAddress = (): void => {
    cy.get(addressForm).submit()
  }

  provideExistingAddress = (): void => {
    this.selectFirstBusinessAddressAvailableForShipping()
    this.submitAddress()
  }
}
