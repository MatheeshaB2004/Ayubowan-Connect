import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from '../components/header_footer/Footer';

// Mock specific imports
jest.mock('@/lib/api', () => ({
  getApiUrl: jest.fn(() => 'http://localhost:3001')
}));

// Mock global fetch for the newsletter form
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Thank you for subscribing!' }),
  })
) as jest.Mock;

describe('Footer Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders brand logo and text correctly', () => {
    render(<Footer />);
    expect(screen.getByText('Ayubowan')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('renders correct key navigation links', () => {
    render(<Footer />);
    const privacyLinks = screen.getAllByRole('link');
    expect(privacyLinks.length).toBeGreaterThan(0);
  });

  it('interacts with the newsletter subscription correctly', async () => {
    render(<Footer />);
    const emailInput = screen.getByPlaceholderText(/Email address here/i);
    const submitBtn = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Thank you for subscribing!')).toBeInTheDocument();
    });
  });

  it('opens the Cookie Settings Lightbox gracefully on click', async () => {
    const { container } = render(<Footer />);
    const cookieTriggers = screen.getAllByText(/Cookie settings/i);
    fireEvent.click(cookieTriggers[cookieTriggers.length - 1]);

    await waitFor(() => {
      // Look for the inner text the user added to the Lightbox
      expect(screen.getByText(/Our Approach to Privacy/i)).toBeInTheDocument();
    });
  });
});
