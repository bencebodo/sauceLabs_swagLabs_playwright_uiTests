import { test, expect } from './fixtures/fixtures';
import { APP_CONFIG } from '../utils/constants';
import { ProductDetails } from '../domain/models/product-details.model';
import { getPriceValue } from '../utils/numeric.utils';

test.beforeEach(async ({ page , uiAuthenticationService}) => {
  await page.goto(APP_CONFIG.baseurl);
  await uiAuthenticationService.performLogin(APP_CONFIG.userCredentials.standardUser, APP_CONFIG.userCredentials.password);
});

test('full checkout flow with item re-selection', async ({ uiProductsService, uiCartService, uiCheckoutService }) => {
    let itemName = "Sauce Labs Bolt T-Shirt";

    // Select sorting by Price (low to high)
    await uiProductsService.selectSortingByPriceLowToHigh();

    const products = await uiProductsService.getAllProducts();
    const actualPrices = await Promise.all(products.map(product => getPriceValue(product.priceElement)));

    expect(actualPrices).toEqual([...actualPrices].sort((a, b) => a - b));

    // Add item to cart

    const isAddButtonVisible = await uiProductsService.isProductAddedToCart(itemName);
    await uiProductsService.addItemToCart(itemName);
    const isRemoveButtonVisible = await uiProductsService.isProductAddedToCart(itemName);

    expect(isAddButtonVisible).toBeFalsy();
    expect(isRemoveButtonVisible).toBeTruthy();

    // Cart counter should be 1

    const actualCartCounterValue = await uiProductsService.getCartCounter();

    expect(actualCartCounterValue).toHaveText('1');

    const productPageItem = await uiProductsService.getProductDetailsByName(itemName);

    await uiProductsService.goToCart();

    const cartPageItem = await uiCartService.getProductDetailsByName(itemName);

    expect(cartPageItem).toEqual(productPageItem);

    //Remove item from cart

    await uiCartService.removeProductFromCart(itemName);

    expect(await uiCartService.getAllProductsInCart()).toHaveLength(0);

    await uiCartService.returnToShopping();

    // Add backpack to cart

    itemName = "Sauce Labs Backpack";
    const backpackPrice = uiProductsService.getProductsPriceByName(itemName);

    await uiProductsService.addItemToCart(itemName);
    await uiProductsService.goToCart();
    await uiCartService.goToCheckout();

    //Go to checkout and overview

    await uiCheckoutService.continueToOverview();

    const overviewPrice = await uiCheckoutService.getSubtotal();

    expect(overviewPrice).toBe(await backpackPrice);

    //Finish checkout

    await uiCheckoutService.finishOrder();

    expect((await uiCheckoutService.succesfulOrderImg()).isVisible()).toBeTruthy();
});


