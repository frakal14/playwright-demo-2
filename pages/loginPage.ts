import { Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.components';

export class LoginPage {
  constructor(private page: Page) {}

  header = new HeaderComponent(this.page);

  emailInput = this.page.locator('#email');
  passwordInput = this.page.getByLabel('Password');
  signInButton = this.page.getByRole('button', { name: ' Sign in' });

  accountName = this.page.locator('.account');
  expectedAccountName = 'Karol test';

  invalidEmailAlert = this.page.getByText('Invalid email address.');
  invalidPasswordAlert = this.page.getByText('Authentication failed.');
  invalidShortPasswordAllert = this.page.getByText('Invalid password.');

  async login(userEmail: string, userPassword: string): Promise<void> {
    await this.header.signInButton.click();
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.signInButton.click()
  }

  async logout(): Promise<void> {
    this.header.signOutButton.click();
  }
}