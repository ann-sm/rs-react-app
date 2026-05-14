import type { Pokemon, PokemonData, PokemonResponse } from '../types';

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const ITEMS_ON_PAGE = 20;

export async function fetchPokemonList(
  searchValue: string,
  page: number
): Promise<{ items: Pokemon[]; itemsTotal: number }> {
  const limit = ITEMS_ON_PAGE;
  const offset = (page - 1) * limit;

  if (!searchValue) {
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
    const items: Pokemon[] = await Promise.all(
      data.results.map(async (item) => await fetchPokemonData(item.url))
    );
    const itemsTotal = data.count;
    return { items, itemsTotal };
  }
  // Search by name
  const response = await fetch(`${BASE_URL}?limit=1350&offset=0`);
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Server error. Try again later.');
    }
    if (response.status >= 400) {
      throw new Error('Client error. Try again later.');
    }
  }
  const data: { results: PokemonResponse[] } = await response.json();
  const filteredData = data.results.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const paginatedData = filteredData.slice(offset, offset + limit);

  const pokemons: Pokemon[] = await Promise.all(
    paginatedData.map(async (item) => await fetchPokemonData(item.url))
  );

  return { items: pokemons, itemsTotal: filteredData.length };
}

export async function fetchPokemonData(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  const data: PokemonData = await response.json();

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
}
