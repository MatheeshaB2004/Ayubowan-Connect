import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import CartRedirect from './page';
import * as navigation from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CartRedirect Unit Tests', () => {
  it('redirects to the payments cart instantly upon mounting', async () => {
    const mockReplace = jest.fn();
    (navigation.useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
      push: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as AppRouterInstance);
    
    render(<CartRedirect />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/payments/cart');
    });
  });
});
