import { Page } from "@playwright/test";


export  class CheckoutComponent {
    constructor(private page: Page)  {}

     // Faded Short Sleeve T-shirts blue variant size 2
  async addSingleProductToCart(page): Promise<void> {
    const productUrl =
      'http://www.automationpractice.pl/index.php?id_category=3&controller=category';
    await page.goto(productUrl);
    await page.locator('#color_2').click();
    await page.getByLabel('Size').selectOption('2');
    await page.locator('#add_to_cart').click()
    await page.getByRole('link', { name: 'Proceed to checkout ' }).click();
  }

    

}