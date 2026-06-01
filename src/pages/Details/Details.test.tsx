import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Details from './Details';
import { CardPropsMissing, mockData } from '../../__tests__/mocks';

const mockUseGetPokemonQuery = vi.fn();

vi.mock('../../services/pokemonApi', () => ({
  useGetPokemonQuery: () => mockUseGetPokemonQuery(),
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderDetails = (detailsId: string | null, page: string = '1') => {
  const initialEntry = detailsId ? `/?details=${detailsId}&page=${page}` : '/';

  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Details />
    </MemoryRouter>
  );
};

describe('Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseGetPokemonQuery.mockClear();
  });

  it('renders loader when no pokemon data', () => {
    mockUseGetPokemonQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      error: null,
    });

    renderDetails('1');

    expect(screen.getByLabelText('animate-spin')).toBeInTheDocument();
  });

  it('fetches and displays pokemon details', async () => {
    mockUseGetPokemonQuery.mockReturnValue({
      data: mockData.items[0],
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderDetails('1', '1');

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    expect(screen.getByText('types: grass, poison')).toBeInTheDocument();
    expect(
      screen.getByText('abilities: overgrow, chlorophyll')
    ).toBeInTheDocument();
    expect(screen.getByText('height: 7')).toBeInTheDocument();
    expect(screen.getByText('weight: 69')).toBeInTheDocument();
  });

  it('displays fallback text when image is missing', async () => {
    const pokemonWithoutImage = {
      ...mockData.items[0],
      image: '',
    };
    mockUseGetPokemonQuery.mockReturnValue({
      data: pokemonWithoutImage,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderDetails('1');

    await waitFor(() => {
      expect(screen.getByText('No image available')).toBeInTheDocument();
    });

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

  it('displays fallback for missing data fields', async () => {
    mockUseGetPokemonQuery.mockReturnValue({
      data: CardPropsMissing.data,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderDetails('1');

    await waitFor(() => {
      expect(screen.getByText('types: n/a')).toBeInTheDocument();
      expect(screen.getByText('abilities: n/a')).toBeInTheDocument();
      expect(screen.getByText('height: 10')).toBeInTheDocument();
      expect(screen.getByText('weight: 100')).toBeInTheDocument();
    });
  });

  it('does not render audio when cry is missing', async () => {
    const pokemonWithoutCry = {
      ...mockData.items[0],
      cry: '',
    };
    mockUseGetPokemonQuery.mockReturnValue({
      data: pokemonWithoutCry,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderDetails('1');

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    const audio = screen.queryByRole('audio');
    expect(audio).not.toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    mockUseGetPokemonQuery.mockReturnValue({
      data: mockData.items[0],
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderDetails('1', '2');

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('×');
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
