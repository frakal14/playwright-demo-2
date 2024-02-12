import { Page } from '@playwright/test';
import { CheckoutComponent } from '../components/checkout.components';

export class CheckoutPage {
  constructor(private page: Page) {}

  checkout = new CheckoutComponent(this.page);

  modalCheckoutButton = this.page.getByRole('link', {
    name: 'Proceed to checkout ',
  });
  cartCheckoutButton = this.page.locator('[title="Proceed to checkout"]')

  termsOfServiceCheckBox = this.page.locator('[for="cgv"]');

  payByCheck = this.page.getByRole('link', { name: 'Pay by check (order' });
  confirmOrderButton = this.page.getByRole('button', {
    name: 'I confirm my order ',
  });

  orderConfirmAlert = this.page.getByText('Your order on My Shop is complete.');

  async clickOnModalCheckoutButton(): Promise<void> {
    await this.modalCheckoutButton.click();
  }

  async clickOnCartCheckoutButton(): Promise<void> {
    await this.cartCheckoutButton.click()
  }

  async clickOnAddressCheckoutButton(): Promise<void> {
    this.page.locator('[name=processAddress]').click()
  }

  async clickOnShippingCheckoutButton(): Promise<void> {
    const shippingCheckoutButton = `[name='processCarrier']`;
    await this.page.click(shippingCheckoutButton);
  }

  async checkTermsOfService(): Promise<void> {
    await this.termsOfServiceCheckBox.click();
  }

  async clickOnPayByCheck(): Promise<void> {
    await this.payByCheck.click();
  }

  async clickOnConfirmOrderButton(): Promise<void> {
    await this.confirmOrderButton.click();
  }
}