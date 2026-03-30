import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DashboardPage from './page';

describe('DashboardPage Unit Tests', () => {
  it('renders the dashboard primary header layout', () => {
    render(<DashboardPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Customer Dashboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Manage your bookings and orders in one place/i)
    ).toBeInTheDocument();
  });

  it('renders all four dashboard shortcut cards with CTA', () => {
    render(<DashboardPage />);
    
    expect(screen.getByText('Pending Bookings')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Experiences')).toBeInTheDocument();
    expect(screen.getByText('My Events')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    
    // Each card has a "View" button for deep linking
    const viewButtons = screen.getAllByRole('button', { name: /View/i });
    expect(viewButtons).toHaveLength(4);
  });
});
