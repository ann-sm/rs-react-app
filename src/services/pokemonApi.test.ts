import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi, ITEMS_ON_PAGE, POKEMONS_TOTAL } from './pokemonApi';
import { mockPokemonDataResponse1 } from '../__tests__/mocks';

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

    await expect(
      store
        .dispatch(
          pokemonApi.endpoints.getPokemonList.initiate({
            searchValue: '',
            page: 1,
          })
        )
        .unwrap()
    ).rejects.toThrow('Failed to fetch pokemon 1');
  });
});
