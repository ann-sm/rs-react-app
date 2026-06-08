import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import SubmissionCard from './SubmissionCard';

describe('SubmissionCard', () => {
  const mockSubmission = {
    name: 'John Doe',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    termsAccepted: true,
    image: 'data:image/png;base64,test',
    password: 'password123',
    confirmPassword: 'password123',
    country: 'Germany',
    isNew: true,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render submission data inside separate text segments correctly', () => {
    render(<SubmissionCard submission={mockSubmission} />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'John Doe' })
    ).toBeInTheDocument();

    expect(screen.getByText(/age:/i)).toHaveTextContent('age: 25');
    expect(screen.getByText(/email:/i)).toHaveTextContent(
      'email: john@example.com'
    );
    expect(screen.getByText(/gender:/i)).toHaveTextContent('gender: male');
    expect(screen.getByText(/country:/i)).toHaveTextContent('country: Germany');
  });

  it('should show image when provided', () => {
    render(<SubmissionCard submission={mockSubmission} />);

    const image = screen.getByAltText('Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockSubmission.image);
  });

  it('should add new-submission class when isNew is true and remove it after 5 seconds', () => {
    const { container } = render(
      <SubmissionCard submission={mockSubmission} />
    );
    const card = container.firstChild;

    expect(card).toHaveClass('new-submission');

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(card).not.toHaveClass('new-submission');
  });

  it('should not show image when image is null', () => {
    const submission = { ...mockSubmission, image: null };
    render(<SubmissionCard submission={submission} />);

    const image = screen.queryByAltText('Image');
    expect(image).not.toBeInTheDocument();
  });
});
