import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-teal-950">
          <div className="flex flex-col flex-1 items-center justify-center">
            <h1 className="text-4xl font-mono uppercase text-teal-700 dark:text-teal-600">
              Something went very wrong
            </h1>
            <p className="text-xl font-mono p-6 dark:text-gray-300">
              {this.state.error?.message}
            </p>
            <button
              className="bg-yellow-500 text-white font-mono  text-lg px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
              onClick={() => this.setState({ hasError: false })}
            >
              Fix it
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
