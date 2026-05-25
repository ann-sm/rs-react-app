import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchPokemonList } from './services/api';
import App from './App';
import { mockData } from './__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

vi.mock('./services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    fetchPokemonList: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();

const renderApp = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('App', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('makes initial API call on component mount', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue(mockData);

    renderApp();

    expect(fetchPokemonList).toHaveBeenCalledWith('', 1);
    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('ann-sm-pokemons', 'Bulbasaur');

    renderApp();

    await waitFor(() => {
      vi.mocked(fetchPokemonList).mockResolvedValue(mockData);
      expect(fetchPokemonList).toHaveBeenCalledWith('Bulbasaur', 1);
    });

    expect(screen.getByDisplayValue('Bulbasaur')).toBeInTheDocument();
  });

  it('saves search term to localStorage and updates state on search', async () => {
    renderApp();
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

    renderApp();

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
    renderApp();
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'bulbasaur');
    await user.click(button);
    await waitFor(() => {
      expect(fetchPokemonList).toHaveBeenCalledWith('bulbasaur', 1);
    });
  });

  it('should navigate to next page', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue({
      ...mockData,
      itemsTotal: 21,
    });

    renderApp();

    await waitFor(() => {
      expect(screen.queryByLabelText('.animate-spin')).not.toBeInTheDocument();
    });
    const nextButton = screen.getByRole('button', { name: '>' });
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
    });
  });

  it('should navigate to previous page', async () => {
    vi.mocked(fetchPokemonList).mockResolvedValue({
      ...mockData,
      itemsTotal: 21,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?page=2']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText('animate-spin')).not.toBeInTheDocument();
    });

    expect(fetchPokemonList).toHaveBeenCalledWith('', 2);

    const previousButton = screen.getByRole('button', { name: '<' });
    await user.click(previousButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
    });
  });
});
