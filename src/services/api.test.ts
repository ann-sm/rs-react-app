import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchPokemonList, ITEMS_ON_PAGE, POKEMONS_TOTAL } from './api';
import {
  mockPokemonResponse,
  mockPokemonDataResponse1,
  mockPokemonDataResponse4,
  mockPokemonDataResponse8,
} from '../__tests__/mocks';

vi.mock('./services/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    fetchPokemonList: vi.fn(),
  };
});

describe('API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('fetches pokemon list successfully without search value', async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;
    fetchMock.mockImplementation((url: string) => {
      if (url.includes(`pokemon?limit=${ITEMS_ON_PAGE}&offset=0`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse),
        });
      }
      if (url.includes('pokemon/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonDataResponse1),
        });
      }
      if (url.includes('pokemon/4')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonDataResponse4),
        });
      }
      if (url.includes('pokemon/8')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonDataResponse8),
        });
      }
      return Promise.reject(new Error('Failed to fetch'));
    });

    const result = await fetchPokemonList('', 1);
    expect(result.items).toHaveLength(3);
    expect(result.items[0].name).toBe('bulbasaur');
  });

  it('fetches and filters pokemon list successfully with search value', async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;
    fetchMock.mockImplementationOnce((url: string) => {
      if (url.includes(`pokemon?limit=${POKEMONS_TOTAL}&offset=0`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse),
        });
      }
      return Promise.reject(new Error('Failed to fetch'));
    });

    fetchMock.mockImplementation((url: string) => {
      if (url.includes('pokemon/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonDataResponse1),
        });
      }
      if (url.includes('pokemon/4')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonDataResponse4),
        });
      }
      if (url.includes('pokemon/8')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonDataResponse8),
        });
      }
      return Promise.reject(new Error('Failed to fetch'));
    });

    const result = await fetchPokemonList('bulba', 1);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('bulbasaur');
  });

  it('throws error for 4xx client errors when fetching without search value', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      })
    );

    await expect(fetchPokemonList('', 1)).rejects.toThrow('Client error');
  });

  it('throws error for 4xx client errors when fetching with search value', async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;

    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      })
    );

    await expect(fetchPokemonList('pikachu', 1)).rejects.toThrow(
      'Client error. Try again later.'
    );
  });

  it('throws error for 5xx server errors when fetching without search value', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    await expect(fetchPokemonList('', 1)).rejects.toThrow('Server error');
  });

  it('throws error for 5xx server errors when fetching with search value', async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;

    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    await expect(fetchPokemonList('pikachu', 1)).rejects.toThrow(
      'Server error'
    );
  });
});
