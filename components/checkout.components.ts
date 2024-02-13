import { Page, expect } from "@playwright/test";


export  class CheckoutComponent {
    constructor(private page: Page)  {}

     // Faded Short Sleeve T-shirts blue variant size 2
  async addSingleProductToCart(page): Promise<void> {
    const productUrl =
      'http://www.automationpractice.pl/index.php?id_product=1&controller=product';
    await page.goto(productUrl);
    await page.locator('#color_14').click();
    await page.locator('[name="Submit"]').click({force: true})
    await page.click('[title="Proceed to checkout"]')
    await page.getByRole('link', { name: 'Proceed to checkout ' }).click();
  }

    

}