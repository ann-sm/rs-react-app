'use client';

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import ErrorButton from "../ErrorButton/ErrorButton";

const ErrorBoundaryWrapper = () => {
  return (
    <ErrorBoundary>
      <ErrorButton />
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWrapper;