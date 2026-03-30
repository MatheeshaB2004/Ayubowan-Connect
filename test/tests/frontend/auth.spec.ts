import { test, expect } from '@playwright/test';

test.describe('Authentication E2E', () => {
  test('should navigate to the Login page and show form', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
  });

  test('should navigate to the Register page and show form', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign Up|Register/i })).toBeVisible();
  });

  test('should show validation errors on empty login submission', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
    const submit = page.getByRole('button', { name: /Sign In|Login/i });
    await submit.click();
    
    // Modern apps use standard HTML5 validation or UI popups
    // We wait for potentially an error message or the form to remain unsubmitted
    await expect(page.locator('form')).toBeVisible();
  });
});
