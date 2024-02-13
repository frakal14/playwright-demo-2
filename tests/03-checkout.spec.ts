import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { loginData } from '../test-data/login.data';
import { loadHomePage } from '../helpers';

test.describe('User checkout on AutomationPractice', () => {
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    loadHomePage(page);
    await loginPage.login(loginData.userEmail, loginData.userPassword);
  });

  test('successful while logged in and address already saved', async ({
    page,
  }) => {
    checkoutPage.checkout.addSingleProductToCart(page)
    await checkoutPage.clickOnCartCheckoutButton();
    await checkoutPage.clickOnAddressCheckoutButton();
    await checkoutPage.checkTermsOfService();
    await checkoutPage.clickOnShippingCheckoutButton();
    await checkoutPage.clickOnPayByCheck();
    await checkoutPage.clickOnConfirmOrderButton();

    await expect(checkoutPage.orderConfirmAlert).toBeVisible();
  });
});