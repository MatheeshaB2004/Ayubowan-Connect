import '@testing-library/jest-dom';

// Next.js Navigation Mock
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

if (typeof window !== 'undefined') {
  // Mock window.dispatchEvent
  const originalDispatchEvent = window.dispatchEvent;
  window.dispatchEvent = jest.fn((event) => originalDispatchEvent.call(window, event));
}
