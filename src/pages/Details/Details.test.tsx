import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import Details from './Details';
import { fetchPokemonData } from '../../services/api';
import { CardPropsMissing, mockData } from '../../__tests__/mocks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('../../services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    fetchPokemonData: vi.fn(),
  };
});

describe('Details', () => {
  const mockNavigate = vi.fn();
  let mockSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders loader when no pokemon data', () => {
    mockSearchParams = new URLSearchParams({ details: '1', page: '1' });
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('fetches and displays pokemon details', async () => {
    mockSearchParams = new URLSearchParams({ details: '1', page: '1' });
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
    vi.mocked(fetchPokemonData).mockResolvedValue(mockData.items[0]);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

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
    mockSearchParams = new URLSearchParams({ details: '1', page: '1' });
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
    vi.mocked(fetchPokemonData).mockResolvedValue(mockData.items[0]);
    const pokemonWithoutImage = {
      ...mockData.items[0],
      image: '',
    };
    vi.mocked(fetchPokemonData).mockResolvedValue(pokemonWithoutImage);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No image available')).toBeInTheDocument();
    });

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

  it('displays fallback for missing data fields', async () => {
    mockSearchParams = new URLSearchParams({ details: '1', page: '1' });
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
    vi.mocked(fetchPokemonData).mockResolvedValue(CardPropsMissing.data);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('types: n/a')).toBeInTheDocument();
      expect(screen.getByText('abilities: n/a')).toBeInTheDocument();
      expect(screen.getByText('height: 10')).toBeInTheDocument();
      expect(screen.getByText('weight: 100')).toBeInTheDocument();
    });
  });

  it('does not render audio when cry is missing', async () => {
    mockSearchParams = new URLSearchParams({ details: '1', page: '1' });
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

    const pokemonWithoutCry = {
      ...mockData.items[0],
      cry: '',
    };
    vi.mocked(fetchPokemonData).mockResolvedValue(pokemonWithoutCry);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    const audio = screen.queryByRole('audio');
    expect(audio).not.toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    mockSearchParams = new URLSearchParams({ details: '1', page: '2' });
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
    vi.mocked(fetchPokemonData).mockResolvedValue(mockData.items[0]);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('×');
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
