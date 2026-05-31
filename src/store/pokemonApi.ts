import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon, PokemonData, PokemonResponse } from '../types';

const CACHE_TTL = Number(import.meta.env.VITE_API_CACHE_TTL) || 60;

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
export const ITEMS_ON_PAGE = 20;
export const POKEMONS_TOTAL = 1350;

const fetchPokemonList = async (limit: number, offset: number) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Server error. Try again later.');
    }
    if (response.status >= 400) {
      throw new Error('Client error. Try again later.');
    }
  }
  const data: { results: PokemonResponse[]; count: number } =
    await response.json();
  return data;
};

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
  keepUnusedDataFor: CACHE_TTL,
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { items: Pokemon[]; itemsTotal: number },
      { searchValue: string; page: number }
    >({
      async queryFn({ searchValue, page }) {
        if (!searchValue) {
          const limit = ITEMS_ON_PAGE;
          const offset = (page - 1) * limit;

          const data = await fetchPokemonList(limit, offset);

          const items = await Promise.all(
            data.results.map(async (item) => {
              const response = await fetch(item.url);
              const data: PokemonData = await response.json();
              return transformPokemonData(data);
            })
          );
          const itemsTotal = data.count;
          return { data: { items, itemsTotal } };
        }

        // Search by name
        const limit = POKEMONS_TOTAL;
        const offset = 0;

        const res = await fetchPokemonList(limit, offset);

        const filteredData = res.results.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        const paginatedData = filteredData.slice(offset, offset + limit);
        const items = await Promise.all(
          paginatedData.map(async (item) => {
            const response = await fetch(item.url);
            const data: PokemonData = await response.json();
            return transformPokemonData(data);
          })
        );
        const itemsTotal = filteredData.length;
        return { data: { items, itemsTotal } };
      },
    }),

    getPokemon: builder.query<Pokemon, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: PokemonData) =>
        transformPokemonData(response),
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
