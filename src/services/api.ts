import type { Pokemon, PokemonData, PokemonResponse } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (
  searchQuery: string,
  page: number
): Promise<Pokemon[]> => {
  const limit = 25;
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
    const data: { results: PokemonResponse[] } = await response.json();
    const items: Pokemon[] = await Promise.all(
      data.results.map(async (item) => await fetchPokemonData(item.url))
    );
    return items;
  }
  // TO-DO: optimize search by name and add pagination OR switch back to fetch by pokemon id or name
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
  const filteredIems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return filteredIems;
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
