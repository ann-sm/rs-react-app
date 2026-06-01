import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { ThemeProvider } from '../../contexts/theme/ThemeProvider';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

vi.mock('../../store/pokemonApi', () => ({
  pokemonApi: {
    util: {
      invalidateTags: vi.fn(),
    },
  },
  useGetPokemonListQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  useGetPokemonQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
  })),
}));

const renderHeader = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('Header', () => {
  const user = userEvent.setup();

  it('renders the PokéSearch title', () => {
    renderHeader();

    expect(screen.getByText('PokéSearch')).toBeInTheDocument();
  });

  it('title links to home page', () => {
    renderHeader();

    const titleLink = screen.getByText('PokéSearch');
    expect(titleLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders about link with info icon', () => {
    renderHeader();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders theme toggle button', () => {
    renderHeader();

    expect(
      screen.getByLabelText(/Toggle (dark|light) mode/i)
    ).toBeInTheDocument();
  });

  it('should toggle theme when button is clicked', async () => {
    renderHeader();

    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();

    const themeButton = screen.getByLabelText('Toggle dark mode');
    user.click(themeButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Toggle light mode')).toBeInTheDocument();
    });
  });
});
