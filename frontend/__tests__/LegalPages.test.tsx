import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PrivacyPolicyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';

describe('Legal Pages Unit Tests', () => {
  it('renders Privacy Policy page correctly', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
  });

  it('renders Terms and Conditions page correctly', () => {
    render(<TermsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Terms and Conditions/i })).toBeInTheDocument();
  });
});
