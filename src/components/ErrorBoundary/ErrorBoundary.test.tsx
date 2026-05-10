import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import userEvent from '@testing-library/user-event';
import App from '../../App';

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
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went very wrong')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: 'Something went very wrong' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fix it' })).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('throws error when test button is clicked', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
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
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Something went very wrong')).toBeInTheDocument();

    shouldThrow = false;

    const fixButton = screen.getByRole('button', { name: 'Fix it' });
    await user.click(fixButton);

    rerender(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toHaveTextContent('PokéSearch');
    expect(
      screen.queryByText('Something went very wrong')
    ).not.toBeInTheDocument();
  });
});
