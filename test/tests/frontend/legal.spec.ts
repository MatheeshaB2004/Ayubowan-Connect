import { test, expect } from '@playwright/test';

test.describe('Legal Pages and Footer Interactivity', () => {
  test('Footer should navigate to Privacy Policy', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Privacy Policy' }).first().click();
    await expect(page).toHaveURL(/.*privacy/);
    await expect(page.getByRole('heading', { name: /Privacy Policy/i })).toBeVisible();
  });

  test('Footer should trigger Cookie Settings Lightbox', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const cookieSettings = page.getByText('Cookie Settings');
    await cookieSettings.click();
    
    const lightboxHeading = page.getByRole('heading', { name: /Cookie Settings/i });
    await expect(lightboxHeading).toBeVisible();
    await expect(page.getByText(/Our Approach to Privacy/i)).toBeVisible();
  });

  test('Complaints page should accept form input', async ({ page }) => {
    await page.goto('http://localhost:3000/complaints');
    
    await page.getByLabel(/Full Name/i).fill('Test User');
    await page.getByLabel(/Email Address/i).fill('test@example.com');
    await page.getByLabel(/Complaint Description/i).fill('This is a test complaint.');
    
    await page.getByRole('button', { name: /Submit Complaint/i }).click();
    
    await expect(page.getByText(/Submitting/i).or(page.getByText(/Submitted/i))).toBeVisible();
  });
});
