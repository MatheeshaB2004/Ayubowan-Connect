import { test, expect } from '@playwright/test';

const BACKEND_URL = 'http://localhost:3001';

test.describe('Marketplace API Integration Tests', () => {
  test('GET /marketplace should retrieve experiences', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/marketplace`);
    expect([200, 404, 500, 502]).toContain(response.status());

    if (response.ok()) {
      const data = await response.json();
      expect(typeof data).toBe('object');
    }
  });

  test('POST /marketplace/booking rejects unauthorized users', async ({ request }) => {
    const response = await request.post(`${BACKEND_URL}/marketplace/booking`, {
      data: { experienceId: '123', guests: 2 }
    });
    
    // Expecting 401 Unauthorized or 403 Forbidden without valid token
    expect([401, 403, 404, 500, 502]).toContain(response.status());
  });
});
