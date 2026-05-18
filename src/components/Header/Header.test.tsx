import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
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
});
