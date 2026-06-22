'use client';

import { useRouter } from "next/navigation";

type ErrorComponentProps = {
  error: string;
}

const ErrorComponent = ({ error }:  ErrorComponentProps) => {
  const router = useRouter();

  const handleRetryClick = () => {
    router.refresh();
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
        {error}
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
