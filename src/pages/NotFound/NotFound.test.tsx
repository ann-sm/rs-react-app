import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

const mockBack = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockBack,
  };
});

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page not found message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(`Oops! The page you're looking for doesn't exist.`)
    ).toBeInTheDocument();
  });

  it('has a link to go to PokéSearch', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Go to PokéSearch');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has a go back button that navigates to the previous page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const backButton = screen.getByText('Go Back');
    await user.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockBack).toHaveBeenCalledWith(-1);
  });
});
