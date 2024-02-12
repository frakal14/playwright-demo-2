import { Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.components';

export class RegisterPage {
  constructor(private page: Page) {}

  header = new HeaderComponent(this.page);

  async navigateToSignIn(): Promise<void> {
    this.header.signInButton.click();
  }

  createEmailInput = this.page.locator('id=email_create');
  createAccountButton = this.page.getByRole('button', {
    name: ' Create an account',
  });

  invalidEmailAlert = this.page.locator('#create_account_error');
  alreadyRegisteredEmailAlertText =
    'An account using this email address has already been registered. Please enter a valid password or request a new one. ';

  blankFormAlert = this.page.getByText('There are 3 errors lastname');
  invalidPasswordAlert = this.page.getByText('passwd is invalid.');
  

  radioButtonMr = this.page.getByLabel('Mr.');
  firstName = this.page.locator('#customer_firstname');
  lastName = this.page.getByLabel('Last name *');
  email = this.page.locator('#email');
  password = this.page.locator('#passwd');
  dobDays = this.page.locator('#days');
  dobMonths = this.page.locator('#months');
  dobYears = this.page.locator('#years');
  newsletterCheck = this.page.getByLabel('Sign up for our newsletter!');
  registerButton = this.page.getByRole('button', { name: 'Register ' });

  accountCreatedAlert = this.page.getByText('Your account has been created.');

  async fillRegisterEmailInput(userEmail: string): Promise<void> {
    await this.createEmailInput.fill(userEmail);
    await this.createAccountButton.click();
  }

  async radioMrChecked(): Promise<void> {
    await this.radioButtonMr.check();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }

  async fillPassword(password: string): Promise<void> {
    await this.password.fill(password);
  }

  async pickDateOfBirth(
    day: string,
    month: string,
    year: string,
  ): Promise<void> {
    await this.dobDays.selectOption(day);
    await this.dobMonths.selectOption(month);
    await this.dobYears.selectOption(year);
  }

  async newsletterChecked(): Promise<void> {
    await this.newsletterCheck.check();
  }

  async clickOnRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }
}