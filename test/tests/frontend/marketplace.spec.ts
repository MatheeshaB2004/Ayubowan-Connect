import { test, expect } from '@playwright/test';

test.describe('Marketplace E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
  });

  test('should render the Marketplace layout', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Experiences|Marketplace/i })).toBeVisible();
  });

  test('sidebar filters should be visible', async ({ page }) => {
    // Typical filters on the sidebar
    await expect(page.getByText(/Filter/i).first()).toBeVisible();
  });

  test('should handle missing backend gracefully', async ({ page }) => {
    // E2E check to make sure the app doesn't crash completely without data
    const mainContainer = page.locator('main');
    await expect(mainContainer).toBeVisible();
  });
});
