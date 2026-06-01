import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const { mockUseGetPokemonListQuery, mockNavigate } = vi.hoisted(() => ({
  mockUseGetPokemonListQuery: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock('./services/pokemonApi', () => ({
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: (state = {}) => state,
    middleware:
      () => (next: (action: unknown) => unknown) => (action: unknown) =>
        next(action),
    util: {
      invalidateTags: vi.fn(),
    },
  },

  useGetPokemonListQuery: mockUseGetPokemonListQuery,
  useGetPokemonQuery: () => ({
    data: null,
    isLoading: false,
    isFetching: false,
    error: null,
  }),
  ITEMS_ON_PAGE: 20,
  BASE_URL: 'https://pokeapi.co/api/v2/pokemon',
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import App from './App';
import { store } from './store/store';
import { mockData } from './__tests__/mocks';

const renderApp = (initialEntry = '/') => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('App', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockUseGetPokemonListQuery.mockReset();
  });

  it('makes initial API call on component mount', async () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('ann-sm-pokemons', 'Bulbasaur');

    mockUseGetPokemonListQuery.mockReturnValue({
      data: { ...mockData, items: [mockData.items[0]], itemsTotal: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderApp();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Bulbasaur')).toBeInTheDocument();
    });
  });

  it('saves search term to localStorage and updates state on search', async () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      error: null,
    });

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

  it('shows loading spinner when data is loading', async () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      error: null,
    });

    renderApp();

    expect(screen.getByLabelText('animate-spin')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('shows pokemon list when data is loaded', async () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderApp();

    await waitFor(() => {
      expect(screen.queryByLabelText('animate-spin')).not.toBeInTheDocument();
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
  });

  it('calls API with correct parameters after search', async () => {
    let capturedSearchValue = '';
    let capturedPage = 0;

    mockUseGetPokemonListQuery.mockImplementation(({ searchValue, page }) => {
      capturedSearchValue = searchValue;
      capturedPage = page;
      return {
        data: mockData,
        isLoading: false,
        isFetching: false,
        error: null,
      };
    });

    renderApp();
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'bulbasaur');
    await user.click(button);

    await waitFor(() => {
      expect(capturedSearchValue).toBe('bulbasaur');
      expect(capturedPage).toBe(1);
    });
  });

  it('should navigate to next page', async () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: { ...mockData, itemsTotal: 21 },
      isLoading: false,
      isFetching: false,
      error: null,
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
    mockUseGetPokemonListQuery.mockReturnValue({
      data: { ...mockData, itemsTotal: 21 },
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderApp('/?page=2');

    await waitFor(() => {
      expect(screen.queryByLabelText('animate-spin')).not.toBeInTheDocument();
    });

    const previousButton = screen.getByRole('button', { name: '<' });
    await user.click(previousButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
    });
  });
});
