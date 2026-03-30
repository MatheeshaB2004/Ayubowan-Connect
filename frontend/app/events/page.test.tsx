import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EventsPage from './page';

// Abstract out the heavier implementation to test the boundary layer and suspense
jest.mock('./components/EventsPageContent', () => ({
  EventsPageContent: () => <div data-testid="events-content">Mocked Events Content</div>
}));

describe('EventsPage Structural Unit Tests', () => {
  it('renders the suspended internal content successfully', () => {
    render(<EventsPage />);
    expect(screen.getByTestId('events-content')).toBeInTheDocument();
  });
});
