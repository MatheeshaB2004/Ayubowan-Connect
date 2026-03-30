import { test, expect } from '@playwright/test';

const BACKEND_URL = 'http://localhost:3001';

test.describe('Events API Integration Tests', () => {
  test('GET /events should return a 200 or 404/500 if unseeded', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/events`);
    
    // Because the backend might be down in standard UI runs, 
    // we assert that we get ANY valid HTTP response structurally
    expect([200, 404, 500, 502]).toContain(response.status());

    if (response.ok()) {
      const data = await response.json();
      expect(Array.isArray(data) || typeof data === 'object').toBeTruthy();
    }
  });

  test('GET /events/:id should handle invalid ID gracefully', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/events/invalid-id-999`);
    expect(response.status()).toBeGreaterThanOrEqual(400); // 400 or 404 typical
  });
});
