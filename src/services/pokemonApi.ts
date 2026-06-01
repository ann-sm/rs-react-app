import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon, PokemonData, PokemonResponse } from '../types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const CACHE_TTL = Number(import.meta.env.VITE_API_CACHE_TTL) || 60;

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
export const ITEMS_ON_PAGE = 20;
export const POKEMONS_TOTAL = 1350;

const transformPokemonData = (data: PokemonData): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.other['official-artwork'].front_default,
    abilities: data.abilities.map((item) => item.ability.name),
    types: data.types.map((item) => item.type.name),
    cry: data.cries.latest,
  };
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['PokemonList', 'Pokemon'],
  keepUnusedDataFor: CACHE_TTL,
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { items: Pokemon[]; itemsTotal: number },
      { searchValue: string; page: number }
    >({
      async queryFn({ searchValue, page }, _api, _extraOptions, fetchWithBQ) {
        const limit = ITEMS_ON_PAGE;
        const offset = (page - 1) * limit;

        if (!searchValue) {
          const response = await fetchWithBQ(
            `?limit=${limit}&offset=${offset}`
          );
          if (response.error) {
            return { error: response.error };
          }

          const data = response.data as {
            results: PokemonResponse[];
            count: number;
          };

          try {
            const items = await Promise.all(
              data.results.map(async (item) => {
                const pokemonId = item.url.split('/').filter(Boolean).pop();
                const response = await fetchWithBQ(`/${pokemonId}`);
                if (response.error) {
                  throw response.error;
                }
                return transformPokemonData(response.data as PokemonData);
              })
            );
            const itemsTotal = data.count;
            return { data: { items, itemsTotal } };
          } catch (error) {
            if (error && typeof error === 'object' && 'status' in error) {
              return { error: error as FetchBaseQueryError };
            }
            return {
              error: {
                status: 'FETCH_ERROR',
                error:
                  error instanceof Error
                    ? error.message
                    : 'Failed to fetch pokemon details',
              } as FetchBaseQueryError,
            };
          }
        }

        // Search by name
        const response = await fetchWithBQ(`?limit=${POKEMONS_TOTAL}&offset=0`);
        if (response.error) {
          return { error: response.error };
        }

        const data = response.data as { results: PokemonResponse[] };

        const filteredData = data.results.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        const paginatedData = filteredData.slice(offset, offset + limit);

        try {
          const items = await Promise.all(
            paginatedData.map(async (item) => {
              const pokemonId = item.url.split('/').filter(Boolean).pop();
              const response = await fetchWithBQ(`/${pokemonId}`);
              if (response.error) {
                throw response.error;
              }
              return transformPokemonData(response.data as PokemonData);
            })
          );
          const itemsTotal = filteredData.length;
          return { data: { items, itemsTotal } };
        } catch (error) {
          if (error && typeof error === 'object' && 'status' in error) {
            return { error: error as FetchBaseQueryError };
          }
          return {
            error: {
              status: 'FETCH_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch pokemon details',
            } as FetchBaseQueryError,
          };
        }
      },
      providesTags: ['PokemonList'],
    }),

    getPokemon: builder.query<Pokemon, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: PokemonData) =>
        transformPokemonData(response),
      providesTags: (_result, _error, id) => [{ type: 'Pokemon', id }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
