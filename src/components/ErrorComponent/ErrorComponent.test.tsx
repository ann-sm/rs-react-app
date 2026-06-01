import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorComponent from './ErrorComponent';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

describe('ErrorComponent', () => {
  const mockOnRetry = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createFetchError = (
    status: 'FETCH_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR',
    error: string
  ): FetchBaseQueryError => ({
    status,
    error,
    data: undefined,
  });

  const createParseError = (
    originalStatus: number,
    data: string,
    error: string
  ): FetchBaseQueryError => ({
    status: 'PARSING_ERROR',
    originalStatus,
    data,
    error,
  });

  const createHttpError = (
    status: number,
    data: unknown
  ): FetchBaseQueryError => ({
    status,
    data,
  });

  describe('error message rendering', () => {
    it('should render default message when error is undefined', () => {
      render(<ErrorComponent error={undefined} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Oops! Something went wrong')
      ).toBeInTheDocument();
      expect(
        screen.getByText('An unknown error occurred. Please try again later.')
      ).toBeInTheDocument();
    });

    it('should render network error message for FETCH_ERROR', () => {
      const error = createFetchError('FETCH_ERROR', 'Network error');

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        )
      ).toBeInTheDocument();
    });

    it('should render parsing error message for PARSING_ERROR', () => {
      const error = createParseError(200, 'Invalid JSON', 'Parsing error');

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Error parsing server response. Please try again.')
      ).toBeInTheDocument();
    });

    it('should render timeout error message for TIMEOUT_ERROR', () => {
      const error = createFetchError('TIMEOUT_ERROR', 'Request timed out');

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Request timed out. Please try again.')
      ).toBeInTheDocument();
    });

    it('should render 400 error message', () => {
      const error = createHttpError(400, { message: 'Bad request' });

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Bad request. Please try again.')
      ).toBeInTheDocument();
    });

    it('should render 404 error message', () => {
      const error = createHttpError(404, 'Not Found');

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Pokemon not found. Please try a different search.')
      ).toBeInTheDocument();
    });

    it('should render 429 error message', () => {
      const error = createHttpError(429, { message: 'Too many requests' });

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText(
          'Too many requests. Please wait a moment and try again.'
        )
      ).toBeInTheDocument();
    });

    it('should render 500 error message', () => {
      const error = createHttpError(500, null);

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Server error. Please try again later.')
      ).toBeInTheDocument();
    });

    it('should render error message from data.message for numeric status', () => {
      const error = createHttpError(403, { message: 'Forbidden access' });

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Error 403: Forbidden access')
      ).toBeInTheDocument();
    });

    it('should render error message from data.error for numeric status', () => {
      const error = createHttpError(403, { error: 'Access denied' });

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(screen.getByText('Error 403: Access denied')).toBeInTheDocument();
    });

    it('should render generic error message for unknown numeric status', () => {
      const error = createHttpError(418, null);

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Error 418: Failed to load pokemon data.')
      ).toBeInTheDocument();
    });

    it('should handle custom error message for string status', () => {
      const error = createFetchError('CUSTOM_ERROR', 'Something went wrong');

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Request error: Something went wrong')
      ).toBeInTheDocument();
    });

    it('should handle SerializedError', () => {
      const error: SerializedError = {
        message: 'Something went wrong in the store',
        name: 'CustomError',
        code: 'ERR_CUSTOM',
      };

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Error: Something went wrong in the store')
      ).toBeInTheDocument();
    });

    it('should handle "Not Found" data as 404', () => {
      const error = createHttpError(404, 'Not Found');

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Pokemon not found. Please try a different search.')
      ).toBeInTheDocument();
    });

    it('should handle "Invalid Pokemon ID" error data', () => {
      const error = createHttpError(404, { error: 'Invalid Pokemon ID' });

      render(<ErrorComponent error={error} onRetry={mockOnRetry} />);

      expect(
        screen.getByText('Pokemon not found. Please try a different search.')
      ).toBeInTheDocument();
    });
  });

  it('should call onRetry when Try Again button is clicked', () => {
    const error = createHttpError(500, null);
    render(<ErrorComponent error={error} onRetry={mockOnRetry} />);
    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should handle SerializedError without message', () => {
    const error: SerializedError = {
      name: 'SomeError',
      code: 'ERR_001',
    };
    render(<ErrorComponent error={error} onRetry={mockOnRetry} />);
    expect(
      screen.getByText('An unexpected error occurred. Please try again later.')
    ).toBeInTheDocument();
  });
});
