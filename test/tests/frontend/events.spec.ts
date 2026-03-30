import { test, expect } from '@playwright/test';

test.describe('Events Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/events');
  });

  test('should render the Events page layout', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /Events/i })).toBeVisible();
  });

  test('should display event filters', async ({ page }) => {
    const categoryDropdown = page.getByText(/Category/i);
    const locationDropdown = page.getByText(/Location/i);
    
    await expect(categoryDropdown).toBeVisible();
    await expect(locationDropdown).toBeVisible();
  });

  test('should display skeleton loaders or connection errors if backend is offline', async ({ page }) => {
    // If the backend fails, our UI handles the error gracefully
    const errorMessage = page.getByText(/Unable to load/i);
    const skeleton = page.locator('.animate-pulse').first();
    
    await expect(errorMessage.or(skeleton)).toBeVisible();
  });
});
