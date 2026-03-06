import { Locator } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";
import { OverviewPage } from "../pages/overview.page";
import { ThankYouPage } from "../pages/thank-you.page";

export class UiCheckoutService {
    private checkoutPage: CheckoutPage;
    private overviewPage: OverviewPage;
    private thankYouPage: ThankYouPage;

    constructor(checkoutPage: CheckoutPage, overviewPage: OverviewPage, thankYouPage: ThankYouPage) {
        this.checkoutPage = checkoutPage;
        this.overviewPage = overviewPage;
        this.thankYouPage = thankYouPage;
    }

    async continueToOverview(): Promise<void> {
        await this.checkoutPage.enterFirsName('firstName');
        await this.checkoutPage.enterLastName('lastName');
        await this.checkoutPage.enterPostalCode('postalCode');
        await this.checkoutPage.clickContinueButton();
    }

    async getSubtotal(): Promise<number | null> {
        const subtotalText = await this.overviewPage.getSubtotal();
        return subtotalText ? parseFloat(subtotalText.replace('Item total: $', '')) : null;
    }

    async finishOrder(): Promise<void> {
        await this.overviewPage.clickOnFinishButton();
    }

    async succesfulOrderImg(): Promise<Locator> {
        return await this.thankYouPage.succesfulOrderImg;
    }
}