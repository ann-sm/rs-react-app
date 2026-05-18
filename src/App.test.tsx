import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchPokemonList } from './services/api';
import App from './App';
import { mockData } from './__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

vi.mock('./services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    fetchPokemonList: vi.fn(),
  };
});

describe('App', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('makes initial API call on component mount', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue(mockData);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(fetchPokemonList).toHaveBeenCalledWith('', 1);
    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('ann-sm-pokemons', 'Bulbasaur');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      vi.mocked(fetchPokemonList).mockResolvedValue(mockData);
      expect(fetchPokemonList).toHaveBeenCalledWith('Bulbasaur', 1);
    });

    expect(screen.getByDisplayValue('Bulbasaur')).toBeInTheDocument();
  });

  it('saves search term to localStorage and updates state on search', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'charmander');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('ann-sm-pokemons')).toBe('charmander');
      expect(screen.getByDisplayValue('charmander')).toBeInTheDocument();
    });
  });

  it('manages loading states during API calls', async () => {
    let resolvePromise: (value: typeof mockData) => void;
    const promise = new Promise<typeof mockData>((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(fetchPokemonList).mockReturnValue(promise);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('animate-spin')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();

    resolvePromise!(mockData);

    await waitFor(() => {
      expect(screen.queryByLabelText('.animate-spin')).not.toBeInTheDocument();
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  it('calls API with correct parameters after search', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'bulbasaur');
    await user.click(button);
    await waitFor(() => {
      expect(fetchPokemonList).toHaveBeenCalledWith('bulbasaur', 1);
    });
  });
});
