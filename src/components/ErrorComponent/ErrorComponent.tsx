import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type QueryError = FetchBaseQueryError | SerializedError | undefined;

function getErrorMessage(error: QueryError): string {
  if (!error) {
    return 'An unknown error occurred. Please try again later.';
  }

  if ('status' in error) {
    const status = error.status;
    const errorMessage = 'error' in error ? error.error : null;
    const data = error.data;

    if (error.data === 'Not Found' || errorMessage === 'Invalid Pokemon ID') {
      return 'Pokemon not found. Please try a different search.';
    }

    if (typeof status === 'string') {
      switch (status) {
        case 'FETCH_ERROR':
          return 'Network error: Unable to connect to the server. Please check your internet connection.';
        case 'PARSING_ERROR':
          return 'Error parsing server response. Please try again.';
        case 'TIMEOUT_ERROR':
          return 'Request timed out. Please try again.';
        default:
          return `Request error: ${errorMessage || status}`;
      }
    }

    if (typeof status === 'number') {
      if (status === 400) {
        return 'Bad request. Please try again.';
      }
      if (status === 404) {
        return 'Pokemon not found. Please try a different search.';
      }
      if (status === 429) {
        return 'Too many requests. Please wait a moment and try again.';
      }
      if (status === 500) {
        return 'Server error. Please try again later.';
      }
      if (status >= 500) {
        return 'Server error. Please try again later.';
      }

      if (data && typeof data === 'object') {
        if ('message' in data && typeof data.message === 'string') {
          return `Error ${status}: ${data.message}`;
        }
        if ('error' in data && typeof data.error === 'string') {
          return `Error ${status}: ${data.error}`;
        }
      }

      return `Error ${status}: Failed to load pokemon data.`;
    }
  }

  if ('message' in error && error.message) {
    return `Error: ${error.message}`;
  }

  return 'An unexpected error occurred. Please try again later.';
}

function ErrorComponent({
  error,
  onRetry,
}: {
  error: QueryError;
  onRetry: () => void;
}) {
  const errorMessage = getErrorMessage(error);

  const handleRetryClick = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <svg
          className="mx-auto h-16 w-16 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-label="Error icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="text-xl font-mono text-red-400 mb-2">
        Oops! Something went wrong
      </p>
      <p className="text-md font-mono text-gray-600 dark:text-gray-400">
        {errorMessage}
      </p>
      <button
        onClick={handleRetryClick}
        className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 hover:cursor-pointer font-mono"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorComponent;
