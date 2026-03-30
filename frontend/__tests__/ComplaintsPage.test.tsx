import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import ComplaintsPage from '../app/complaints/page';

describe('ComplaintsPage Unit Tests', () => {
  
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all form fields correctly', () => {
    render(<ComplaintsPage />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('handles user input and updates state dynamically', () => {
    render(<ComplaintsPage />);
    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  it('submits form successfully and shows confirmation', async () => {
    render(<ComplaintsPage />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'other' } });
    fireEvent.change(screen.getByLabelText(/Complaint Description/i), { target: { value: 'Issue description' } });
    
    const submitBtn = screen.getByRole('button', { name: /Submit Complaint/i });
    fireEvent.click(submitBtn);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    await waitFor(() => {
      expect(screen.getByText('Complaint Submitted')).toBeInTheDocument();
    });
  });
});
