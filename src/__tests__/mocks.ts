import type { Pokemon, CardProps, CardListProps } from '../types';

export const mockData: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    height: 7,
    weight: 69,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    abilities: ['overgrow', 'chlorophyll'],
  },
  {
    id: 4,
    name: 'Charmander',
    height: 6,
    weight: 85,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    abilities: ['blaze', 'solar-power'],
  },
];

export const mockCardList: CardListProps = {
  pokemons: mockData,
  isLoading: false,
};

export const mockCardListPropsMissing: CardListProps = {
  pokemons: [
    {
      id: 1,
      name: '',
      height: 10,
      weight: 100,
      image: '',
      abilities: [],
    },
    {
      id: 2,
      name: '',
      height: 8,
      weight: 60,
      image: '',
      abilities: [],
    },
  ],
  isLoading: false,
};

export const mockCard: CardProps = {
  data: {
    id: 1,
    name: 'Bulbasaur',
    height: 7,
    weight: 69,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    abilities: ['overgrow', 'chlorophyll'],
  },
};

export const CardPropsMissing: CardProps = {
  data: {
    id: 1,
    name: '',
    height: 10,
    weight: 100,
    image: '',
    abilities: [],
  },
};

export const mockPokemonResponse = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
  ],
};

export const mockPokemonDataResponse1 = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } },
  ],
};

export const mockPokemonDataResponse4 = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  abilities: [
    { ability: { name: 'blaze' } },
    { ability: { name: 'solar-power' } },
  ],
};

export const mockPokemonDataResponse8 = {
  id: 8,
  name: 'wartortle',
  height: 10,
  weight: 225,
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
  },
  abilities: [
    { ability: { name: 'torrent' } },
    { ability: { name: 'rain-dish' } },
  ],
};
