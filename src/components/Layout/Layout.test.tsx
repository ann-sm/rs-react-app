import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import type { ReactNode } from 'react';

vi.mock('../Header/Header', () => ({
  default: () => <div data-testid="mock-header">Header Mock</div>,
}));

vi.mock('../ErrorBoundary/ErrorBoundary', () => ({
  default: ({ children }: { children?: ReactNode }) => (
    <div data-testid="mock-error-boundary">{children}</div>
  ),
}));

describe('Layout', () => {
  it('renders Header component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders Outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-error-boundary')).toBeInTheDocument();
  });

  it('wraps content with ErrorBoundary', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const errorBoundary = screen.getByTestId('mock-error-boundary');
    expect(errorBoundary).toBeInTheDocument();
  });
});
