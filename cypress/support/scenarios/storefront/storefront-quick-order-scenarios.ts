import { StorefrontQuickOrderPage } from '../../page-objects/storefront/quick-order/storefront-quick-order-page'

export class StorefrontQuickOrderScenarios {
  quickOrderPage = new StorefrontQuickOrderPage()

  addProduct = (
    skuOrName: string,
    quantity: number = 1,
    merchantName?: string,
    rowIndex: number = 0
  ): void => {
    this.quickOrderPage.searchProduct(rowIndex, skuOrName)
    this.quickOrderPage.applySuggestedProduct(skuOrName)

    if (merchantName) {
      this.quickOrderPage.selectProductMerchant(rowIndex, merchantName)
    }

    if (quantity > 1) {
      for (let i = 1; i < quantity; i++) {
        this.quickOrderPage.incrementQuantity(rowIndex)
      }
    }
  }
}