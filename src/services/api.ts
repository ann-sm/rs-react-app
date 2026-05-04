import type { Pokemon, PokemonData, PokemonResponse } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: { results: PokemonResponse[] } = await response.json();

    const items: Pokemon[] = await Promise.all(data.results.map(async(item) => await fetchPokemonData(item.url)))
    return items;

  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  } 
};

const fetchPokemonData = async(url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  const data: PokemonData = await response.json();

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.front_default,
  }
}