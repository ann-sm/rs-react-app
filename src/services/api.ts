import type { Pokemon, PokemonData, PokemonResponse } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const ITEMS_ON_PAGE = 25;

export const fetchPokemonList = async (
  searchQuery: string,
  page: number
): Promise<{ items: Pokemon[]; itemsTotal: number }> => {
  const limit = ITEMS_ON_PAGE;
  const offset = (page - 1) * limit;

  if (!searchQuery) {
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
  // TO-DO: optimize search by name
  const response = await fetch(`${BASE_URL}?limit=500&offset=0`);
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Server error. Try again later.');
    }
    if (response.status >= 400) {
      throw new Error('Client error. Try again later.');
    }
  }
  const data: { results: PokemonResponse[] } = await response.json();
  const items: Pokemon[] = await Promise.all(
    data.results.map(async (item) => await fetchPokemonData(item.url))
  );
  const filteredItemsAll = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredItems = filteredItemsAll.slice(offset, offset + limit);

  return { items: filteredItems, itemsTotal: filteredItemsAll.length };
};

const fetchPokemonData = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  const data: PokemonData = await response.json();

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.front_default,
    abilities: data.abilities.map((item) => item.ability.name),
  };
};
