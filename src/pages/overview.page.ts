import { type Page, type Locator } from '@playwright/test';

export class OverviewPage {
    readonly page: Page;
    readonly subtotalLabel: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.finishButton = page.getByTestId('finish');
    }

    async clickOnFinishButton(): Promise<void> {
        await this.finishButton.click();
    }

    async getSubtotal(): Promise<string | null> {
        return await this.subtotalLabel.textContent();
    
    }
}