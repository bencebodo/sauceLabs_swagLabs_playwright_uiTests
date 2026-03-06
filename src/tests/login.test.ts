import { test, expect } from './fixtures/fixtures';
import { APP_CONFIG } from '../utils/constants';

test.beforeEach(async ({ page }) => {
  await page.goto(APP_CONFIG.baseurl);
});

test('should not login as a locked out user', async ({page,  uiAuthenticationService }) => {

  await uiAuthenticationService.performLogin(APP_CONFIG.userCredentials.lockedOutUser, APP_CONFIG.userCredentials.password);
  const errorMessage = await uiAuthenticationService.getLoginErrorMessage();
  await uiAuthenticationService.closeLoginErrorMessage();

  expect(errorMessage).toContain(APP_CONFIG.errorMessages.lockedOutUser);
})

test('should login with valid credentials', async ({ page, uiAuthenticationService }) => {

  await uiAuthenticationService.performLogin(APP_CONFIG.userCredentials.standardUser, APP_CONFIG.userCredentials.password);
  await expect(page).toHaveURL(/.*inventory.html/);
})