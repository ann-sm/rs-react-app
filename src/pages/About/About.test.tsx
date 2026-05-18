import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

describe('About', () => {
  it('renders page title', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('About PokéSearch')).toBeInTheDocument();
  });

  it('displays description text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /PokéSearch is a comprehensive Pokémon search application/i
      )
    ).toBeInTheDocument();
  });

  it('displays technologies section', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Technologies Used')).toBeInTheDocument();
    expect(screen.getByText('React with TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React Router')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('displays course section', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('Course')).toBeInTheDocument();
    expect(screen.getByText(/RS School React Course/)).toBeInTheDocument();
  });

  it('has a link to RS School React course that opens in new tab', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const rsSchoolLink = screen.getByText('RS School React Course');
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rsSchoolLink).toHaveAttribute('target', 'blank');
  });

  it('has a back to search link', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const backLink = screen.getByText('← Back to Search');
    expect(backLink).toHaveAttribute('href', '/');
  });
});
