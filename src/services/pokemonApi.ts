import type { Pokemon, PokemonData, PokemonResponse } from '../common/types';
import { BASE_URL, ITEMS_ON_PAGE, POKEMONS_TOTAL } from '../common/constants';

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

export const fetchPokemons = async (searchValue: string, page: number) => {
  const limit = ITEMS_ON_PAGE;
  const offset = (page - 1) * limit;

  try {
    let pokemons: Pokemon[] = [];
    let pokemonsTotal = 0;

    if (!searchValue) {
      const response = await fetch(
        `${BASE_URL}?limit=${limit}&offset=${offset}`,
        { cache: 'force-cache', next: { tags: [`pokemons-${page}`] } }
      );
      if (!response.ok) throw new Error('Failed to fetch pokemons');
      const data: { results: PokemonResponse[]; count: number } =
        await response.json();

      const items = await Promise.all(
        data.results.map(async (item) => {
          const pokemonId = item.url.split('/').filter(Boolean).pop();
          const detailResponse = await fetch(`${BASE_URL}/${pokemonId}`, { cache: 'force-cache' });
          if (!detailResponse.ok)
            throw new Error('Failed to fetch pokemon details');

          return transformPokemonData(await detailResponse.json());
        })
      );

      pokemons = items;
      pokemonsTotal = data.count;
    } else {
      // Search by name
      const response = await fetch(
        `${BASE_URL}?limit=${POKEMONS_TOTAL}&offset=0`,
        { cache: 'force-cache' }
      );
      if (!response.ok) throw new Error('Failed to fetch pokemons');
      const data: { results: PokemonResponse[]; count: number } =
        await response.json();

      const filteredData = data.results.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      const paginatedData = filteredData.slice(offset, offset + limit);

      const items = await Promise.all(
        paginatedData.map(async (item) => {
          const pokemonId = item.url.split('/').filter(Boolean).pop();
          const detailResponse = await fetch(`${BASE_URL}/${pokemonId}`, { cache: 'force-cache' });
          if (!detailResponse.ok)
            throw new Error('Failed to fetch pokemon details');

          return transformPokemonData(await detailResponse.json());
        })
      );
      pokemons = items;
      pokemonsTotal = filteredData.length;
    }
    return { pokemons, pokemonsTotal };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export const getPokemonDetails = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { cache: 'force-cache', next: { tags: [`pokemon-${id}`] }});
    if (!response.ok) throw new Error('Failed to fetch details');
    const data = await response.json();

    return transformPokemonData(data);
  } catch {
      return null;
  }
};