import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { ThemeProvider } from '../../contexts/theme/ThemeProvider';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  const user = userEvent.setup();

  it('renders the PokéSearch title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('PokéSearch')).toBeInTheDocument();
  });

  it('title links to home page', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const titleLink = screen.getByText('PokéSearch');
    expect(titleLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders about link with info icon', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders theme toggle button', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should toggle theme when button is clicked', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();

    const themeButton = screen.getByRole('button');
    user.click(themeButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Toggle light mode')).toBeInTheDocument();
    });
  });
});
