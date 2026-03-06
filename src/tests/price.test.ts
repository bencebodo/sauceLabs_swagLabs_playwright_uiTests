import {test, expect} from './fixtures/fixtures';
import { APP_CONFIG } from '../utils/constants';

test.beforeEach(async ({ page , uiAuthenticationService}) => {
  await page.goto(APP_CONFIG.baseurl);
  await uiAuthenticationService.performLogin(APP_CONFIG.userCredentials.standardUser, APP_CONFIG.userCredentials.password);
});

const testData = [
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Bike Light"
]

for (const itemName of testData) {
test(`Price should be correct on cart page for: ${itemName}`, async ({ uiProductsService, uiCartService }) => {
    const expectedPrice = await uiProductsService.getProductsPriceByName(itemName);

    await uiProductsService.addItemToCart(itemName);
    await uiProductsService.goToCart();

    const actualPrice = await uiCartService.getProductPriceByName(itemName);

    expect(actualPrice).toBe(expectedPrice);

    await uiCartService.resetAppState();

    const cartCount = await uiProductsService.getCartCounter();

    expect(cartCount).toBeHidden();
})
}
