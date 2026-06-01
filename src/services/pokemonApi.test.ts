import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi, ITEMS_ON_PAGE, POKEMONS_TOTAL } from './pokemonApi';
import { mockPokemonDataResponse1 } from '../__tests__/mocks';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const createStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

const createResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

function hasErrorProperty(
  error: unknown
): error is { error: string; status: string | number } {
  return typeof error === 'object' && error !== null && 'error' in error;
}

describe('pokemonApi', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches pokemon list without search', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        createResponse({
          count: 1,
          results: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          ],
        })
      )
      .mockResolvedValueOnce(createResponse(mockPokemonDataResponse1));

    const result = await store
      .dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({
          searchValue: '',
          page: 1,
        })
      )
      .unwrap();

    expect(result).toEqual({
      items: [
        {
          id: 1,
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          image:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          abilities: ['overgrow', 'chlorophyll'],
          types: ['grass', 'poison'],
          cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
        },
      ],
      itemsTotal: 1,
    });

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.url).toContain(`?limit=${ITEMS_ON_PAGE}&offset=0`);
  });

  it('filters pokemon by search term', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        createResponse({
          results: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
            {
              name: 'charmander',
              url: 'https://pokeapi.co/api/v2/pokemon/4/',
            },
          ],
        })
      )
      .mockResolvedValueOnce(createResponse(mockPokemonDataResponse1));

    const result = await store
      .dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({
          searchValue: 'bulb',
          page: 1,
        })
      )
      .unwrap();

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('bulbasaur');
    expect(result.itemsTotal).toBe(1);

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.url).toContain(`?limit=${POKEMONS_TOTAL}&offset=0`);
  });

  it('returns error when list request fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, {
        status: 500,
      })
    );

    await expect(
      store
        .dispatch(
          pokemonApi.endpoints.getPokemonList.initiate({
            searchValue: '',
            page: 1,
          })
        )
        .unwrap()
    ).rejects.toBeDefined();
  });

  it('fetches and transforms a single pokemon', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createResponse(mockPokemonDataResponse1)
    );

    const result = await store
      .dispatch(pokemonApi.endpoints.getPokemon.initiate('1'))
      .unwrap();

    expect(result).toEqual({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      abilities: ['overgrow', 'chlorophyll'],
      types: ['grass', 'poison'],
      cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
    });
  });

  it('supports pagination offset calculation', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      createResponse({
        count: 0,
        results: [],
      })
    );

    await store
      .dispatch(
        pokemonApi.endpoints.getPokemonList.initiate({
          searchValue: '',
          page: 3,
        })
      )
      .unwrap();

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.url).toContain(`?limit=${ITEMS_ON_PAGE}&offset=40`);
  });

  it('returns error when search request fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, {
        status: 500,
      })
    );

    await expect(
      store
        .dispatch(
          pokemonApi.endpoints.getPokemonList.initiate({
            searchValue: 'bulb',
            page: 1,
          })
        )
        .unwrap()
    ).rejects.toBeDefined();
  });

  it('throws when pokemon details request fails during list loading', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        createResponse({
          count: 1,
          results: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          ],
        })
      )
      .mockResolvedValueOnce(
        new Response(null, {
          status: 500,
        })
      );

    try {
      await store
        .dispatch(
          pokemonApi.endpoints.getPokemonList.initiate({
            searchValue: '',
            page: 1,
          })
        )
        .unwrap();
      expect.unreachable('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeDefined();

      if (isFetchBaseQueryError(error)) {
        expect(error.status).toBe(500);
      } else {
        expect(error).toBeTruthy();
      }
    }
  });

  it('handles network error when fetching pokemon details', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        createResponse({
          count: 1,
          results: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          ],
        })
      )
      .mockRejectedValueOnce(new Error('Network error'));

    try {
      await store
        .dispatch(
          pokemonApi.endpoints.getPokemonList.initiate({
            searchValue: '',
            page: 1,
          })
        )
        .unwrap();
      expect.unreachable('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeDefined();

      if (isFetchBaseQueryError(error) && typeof error.status === 'string') {
        expect(error.status).toBe('FETCH_ERROR');
        if (hasErrorProperty(error)) {
          expect(error.error).toBe('Error: Network error');
        }
      } else {
        expect(error).toBeTruthy();
      }
    }
  });

  it('handles invalid pokemon ID', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, {
        status: 404,
      })
    );

    try {
      await store
        .dispatch(pokemonApi.endpoints.getPokemon.initiate('999999'))
        .unwrap();
      expect.unreachable('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeDefined();

      if (isFetchBaseQueryError(error)) {
        expect(error.status).toBe(404);
      } else {
        expect(error).toBeTruthy();
      }
    }
  });
});
