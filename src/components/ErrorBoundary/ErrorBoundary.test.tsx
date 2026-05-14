import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';

const ThrowError = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  const user = userEvent.setup();

  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('catches and handles JavaScript errors in child components', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(screen.getByText('Something went very wrong')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Something went very wrong' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fix it' })).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('throws error when test button is clicked', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const errorButton = screen.getByRole('button', { name: 'Error Button' });
    await user.click(errorButton);

    expect(screen.getByText('Something went very wrong')).toBeInTheDocument();
    expect(
      screen.getByText('Ask Pikachu what we should do...')
    ).toBeInTheDocument();
  });

  it('resets the state when Fix button is clicked', async () => {
    let shouldThrow = true;

    const TestComponent = () => {
      if (shouldThrow) {
        throw new Error('Test Error');
      }
      return <App />;
    };

    const { rerender } = render(
      <MemoryRouter>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.queryByText('Something went very wrong')).toBeInTheDocument();

    shouldThrow = false;

    const fixButton = screen.getByRole('button', { name: 'Fix it' });
    await user.click(fixButton);

    rerender(
      <MemoryRouter>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Enter a pokemon name...');
      expect(input).toBeInTheDocument();
      expect(
        screen.queryByText('Something went very wrong')
      ).not.toBeInTheDocument();
    });
  });
});
