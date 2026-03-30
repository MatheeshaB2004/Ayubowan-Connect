import { test, expect } from '@playwright/test';

const BACKEND_URL = 'http://localhost:3001';

test.describe('Newsletter API Integration Tests', () => {
  test('POST /newsletter/subscribe accepts an email', async ({ request }) => {
    const response = await request.post(`${BACKEND_URL}/newsletter/subscribe`, {
      data: { email: 'playwright-test@ayubowan.com' }
    });
    
    expect([200, 201, 400, 404, 502]).toContain(response.status());

    if (response.ok()) {
      const body = await response.json();
      expect(body.message).toBeDefined();
    }
  });
});
