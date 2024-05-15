import customerCredentials from '../../fixtures/customer-credentials.json'
import productData from '../../fixtures/product-data.json'
import checkoutData from '../../fixtures/checkout-data.json'

import { AccessToken } from '../../support/glue-endpoints/authentication/access-token'
import { Carts } from '../../support/glue-endpoints/cart/carts'
import { Items } from '../../support/glue-endpoints/cart/items'
import { Checkout } from '../../support/glue-endpoints/checkout/checkout'
import { validateSchema } from '../../support/api-helper/api-helper'
import accessTokenSchema from '../../support/glue-endpoints/authentication/access-token.response'

const tokenEndpoint = new AccessToken()
const cartEndpoint = new Carts()
const itemsEndpoint = new Items()
const checkoutEndpoint = new Checkout()

context('Customer checkout', () => {
  it('can place order via GLUE', () => {
    let token: string
    let cartId: string

    tokenEndpoint
      .getCustomerAccessToken(
        customerCredentials.email,
        customerCredentials.password
      )
      .then((response) => {
        validateSchema(accessTokenSchema, response)
        expect(response.isOkStatusCode).to.be.true
        token = response.body.data.attributes.accessToken
        return token
      })
      .then((token: string) => {
        return cartEndpoint.createGrossCart(token).then((response) => {
          expect(response.isOkStatusCode).to.be.true
          expect(response.body.data.id).to.not.be.null
          cartId = response.body.data.id
          return { token, cartId }
        })
      })
      .then(({ token, cartId }: { token: string; cartId: string }) => {
        itemsEndpoint
          .addOfferToCart(
            token,
            cartId,
            productData.availableProduct.concreteSku,
            1,
            productData.availableProduct.merchantReference
          )
          .then((response) => {
            expect(response.isOkStatusCode).to.be.true
            return { token, cartId }
          })
      })
      .then(({ token, cartId }: { token: string; cartId: string }) => {
        checkoutEndpoint
          .placeOrder(
            token,
            cartId,
            customerCredentials.email,
            checkoutData.glueShipment.id,
            checkoutData.gluePayment.providerName,
            checkoutData.gluePayment.methodName
          )
          .then((response) => {
            expect(response.isOkStatusCode).to.be.true
            expect(response.body.data.attributes.orderReference).to.be.not.null
            const orderReference = response.body.data.attributes.orderReference
            expect(response.body.included[0].id).to.be.eq(orderReference)
          })
      })
  })
})
