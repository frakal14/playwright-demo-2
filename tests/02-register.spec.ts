import { test, expect } from '@playwright/test';
import { registerData } from '../test-data/register.data';
import { RegisterPage } from '../pages/registerPage';
import { faker } from '@faker-js/faker';
import { loadHomePage } from '../helpers';

test.describe('User register to AutomationPractice', () => {
  let registerPage: RegisterPage;
  const email = faker.internet.email();

  test.beforeEach(async ({ page, context }) => {
    registerPage = new RegisterPage(page);
    loadHomePage(page);
    await registerPage.header.signInButton.click();
  });

  test('successful register with valid credentials', async ({ page }) => {
    await registerPage.fillRegisterEmailInput(email);
    await registerPage.radioMrChecked();
    await registerPage.fillFirstName(registerData.firstName);
    await registerPage.fillLastName(registerData.lastName);
    expect(registerPage.email).toHaveValue(email);

    await registerPage.fillPassword(registerData.password);
    await registerPage.pickDateOfBirth('10', '5', '1990');
    await registerPage.newsletterChecked();
    await registerPage.clickOnRegisterButton();

    expect(registerPage.accountCreatedAlert).toBeVisible;
  });

  test('unsuccessful register with invalid email', async ({ page }) => {
    await registerPage.fillRegisterEmailInput(registerData.invalidEmail);

    expect(registerPage.invalidEmailAlert).toBeVisible;
  });

  test('unsuccessful register with already registered email', async ({
    page,
  }) => {
    await registerPage.fillRegisterEmailInput(registerData.registeredEmail);

    await Promise.all([
		registerPage.createEmailInput.waitFor({state: 'visible'}),
		expect(registerPage.createEmailInput).toBeVisible()
	])
      
  });

  test('unsuccessful register with too short password', async ({ page }) => {
    await registerPage.fillRegisterEmailInput(registerData.email);
    await registerPage.fillFirstName(registerData.firstName);
    await registerPage.fillLastName(registerData.lastName);
    await registerPage.fillPassword(registerData.shortPassword);
    await registerPage.clickOnRegisterButton();

    expect(registerPage.invalidPasswordAlert).toBeVisible;
  });

  test('unsuccessful register with blank form', async ({ page }) => {
    await registerPage.fillRegisterEmailInput(registerData.email);
    await registerPage.clickOnRegisterButton();

    expect(registerPage.blankFormAlert).toBeVisible;
  });
});