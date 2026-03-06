import {type Page, type Locator} from '@playwright/test';
import { ProductDetails } from '../domain/models/product-details.model';
import { parsePrice } from '../utils/numeric.utils';

export class ProductComponent {
    readonly rootLocator: Locator;
    readonly descElement: Locator;
    readonly priceElement: Locator;
    readonly actionButton: Locator;

    constructor(rootLocator: Locator) {
        this.rootLocator = rootLocator;
        this.descElement = rootLocator.locator('.inventory_item_desc');
        this.priceElement = rootLocator.locator('.inventory_item_price');
        this.actionButton = rootLocator.locator('.btn.btn_small');
    }

    async addToCart(): Promise<void> {
        await this.actionButton
        .filter({ hasText: /add/i })
        .click(); 
    }

    async removeFromCart(): Promise<void> {
        await this.actionButton
        .filter({ hasText: /remove/i })
        .click(); 
    }

    async isAddedToCart(): Promise<boolean> {
        const buttonText = await this.actionButton.textContent();
        return buttonText?.toLowerCase().includes('remove') ?? false;
    }

    async getProductDetails(): Promise<ProductDetails> {
        const description = await this.descElement.textContent();
        const priceRaw = await this.priceElement.textContent();

        return {
            description: description ?? "",
            price: parsePrice(priceRaw)
        };
    }
}

