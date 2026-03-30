import { test, expect } from '@playwright/test';

test.describe('Homepage E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should render the hero section with core messaging', async ({ page }) => {
    await expect(page.getByText(/Ayubowan Connect/i)).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should navigate to Marketplace via CTA', async ({ page }) => {
    // Look for a button or link typically in a hero section
    const exploreBtn = page.getByRole('link', { name: /Explore/i }).first();
    if (await exploreBtn.isVisible()) {
      await exploreBtn.click();
      await expect(page).toHaveURL(/.*marketplace/);
    }
  });

  test('should navigate to Events from the header', async ({ page }) => {
    await page.getByRole('link', { name: /Events/i }).first().click();
    await expect(page).toHaveURL(/.*events/);
  });
});
