import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { useAppSelector } from './store/hooks';

vi.mock('./store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('./components/Forms/UncontrolledForm/UncontrolledForm', () => ({
  default: ({ onSuccess }: { onSuccess: () => void }) => (
    <div data-testid="mock-uncontrolled-form">
      Uncontrolled Form Content
      <button onClick={onSuccess} data-testid="submit-uncontrolled-mock">
        Simulate Success
      </button>
    </div>
  ),
}));

vi.mock('./components/Forms/RHForm/RHForm', () => ({
  default: ({ onSuccess }: { onSuccess: () => void }) => (
    <div data-testid="mock-rhf-form">
      React Hook Form Content
      <button onClick={onSuccess} data-testid="submit-rhf-mock">
        Simulate Success
      </button>
    </div>
  ),
}));

vi.mock('./components/SubmissionCard/SubmissionCard', () => ({
  default: ({ submission }: { submission: { name: string } }) => (
    <div data-testid="mock-submission-card">{submission.name}</div>
  ),
}));

describe('App Component', () => {
  const mockSubmissions = [
    { name: 'John Doe', age: 25, email: 'john@example.com' },
    { name: 'Jane Smith', age: 30, email: 'jane@example.com' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue([]);
  });

  it('renders the initial header and state without modal showing', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /React Forms App/i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Uncontrolled form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /React Hook Form/i })
    ).toBeInTheDocument();

    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('renders history cards when submissions exist in global state', () => {
    vi.mocked(useAppSelector).mockReturnValue(mockSubmissions);

    render(<App />);

    const cards = screen.getAllByTestId('mock-submission-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('opens and closes the Uncontrolled Form modal interaction flow', async () => {
    render(<App />);

    const uncontrolledBtn = screen.getByRole('button', {
      name: /Uncontrolled form/i,
    });
    await userEvent.click(uncontrolledBtn);

    expect(
      screen.getByRole('heading', { name: 'Uncontrolled Form', level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-uncontrolled-form')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: '×' });
    await userEvent.click(closeBtn);

    expect(
      screen.queryByRole('heading', { name: 'Uncontrolled Form', level: 3 })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('mock-uncontrolled-form')
    ).not.toBeInTheDocument();
  });

  it('opens and closes the React Hook Form modal interaction flow', async () => {
    render(<App />);

    const rhfBtn = screen.getByRole('button', { name: /React Hook Form/i });
    await userEvent.click(rhfBtn);

    expect(
      screen.getByRole('heading', { name: 'React Hook Form', level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-rhf-form')).toBeInTheDocument();

    const simulateSuccessBtn = screen.getByTestId('submit-rhf-mock');
    await userEvent.click(simulateSuccessBtn);

    expect(
      screen.queryByRole('heading', { name: 'React Hook Form', level: 3 })
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-rhf-form')).not.toBeInTheDocument();
  });
});
