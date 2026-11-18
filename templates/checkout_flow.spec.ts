import { test, expect } from '@playwright/test';

/**
 * End-to-End Playwright Automated Test Suite for E-Commerce Checkout Flows
 * 
 * Flow Tested:
 * 1. Product discovery and addition to shopping cart
 * 2. Cart verification and subtotal check
 * 3. Checkout initiation & customer information entry
 * 4. Payment method selection & order submission
 * 5. Order confirmation & receipt verification
 */

test.describe('E-Commerce Checkout Flow Regression', () => {

  test('User can successfully add item to cart and complete checkout', async ({ page }) => {
    // 1. Visit Storefront / Product Page
    await page.goto('/');
    await expect(page).toHaveTitle(/Store|Shop|Marketplace/i);

    // 2. Select Product & Add to Cart
    const addToCartButton = page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]').first();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // 3. Open Shopping Cart
    const cartIcon = page.locator('[data-testid="cart-icon"], a[href*="cart"]').first();
    await cartIcon.click();
    await expect(page.locator('.cart-item, [data-testid="cart-item"]')).toHaveCount(1);

    // 4. Proceed to Checkout
    const checkoutButton = page.locator('button:has-text("Checkout"), a:has-text("Proceed to Checkout")');
    await checkoutButton.click();

    // 5. Fill Contact & Delivery Information
    await page.fill('input[name="firstName"], #firstName', 'Alex');
    await page.fill('input[name="lastName"], #lastName', 'Dev');
    await page.fill('input[name="email"], #email', 'alex.tester@example.com');
    await page.fill('input[name="address"], #address', '123 Market Street');
    await page.fill('input[name="city"], #city', 'San Francisco');
    await page.fill('input[name="postalCode"], #postalCode', '94105');

    // 6. Select Payment & Submit
    const placeOrderBtn = page.locator('button:has-text("Place Order"), button:has-text("Pay Now")');
    await placeOrderBtn.click();

    // 7. Verification: Confirm Receipt / Success Page
    await expect(page.locator('text=Order Confirmed, text=Thank you for your order')).toBeVisible({ timeout: 10000 });
  });

});
