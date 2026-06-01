import type { Pokemon, CardProps, CardListProps } from '../types';

export const mockData: { items: Pokemon[]; itemsTotal: number } = {
  items: [
    {
      id: 1,
      name: 'Bulbasaur',
      height: 7,
      weight: 69,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      abilities: ['overgrow', 'chlorophyll'],
      types: ['grass', 'poison'],
      cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
    },
    {
      id: 4,
      name: 'Charmander',
      height: 6,
      weight: 85,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      abilities: ['blaze', 'solar-power'],
      types: ['fire'],
      cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/4.ogg',
    },
  ],
  itemsTotal: 2,
};

export const mockCardList: CardListProps = {
  pokemons: mockData.items,
  isLoading: false,
  isFetching: false,
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
      types: [],
      cry: '',
    },
    {
      id: 2,
      name: '',
      height: 8,
      weight: 60,
      image: '',
      abilities: [],
      types: [],
      cry: '',
    },
  ],
  isLoading: false,
  isFetching: false,
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
    types: ['grass', 'poison'],
    cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
  },
};

export const mockCard2: CardProps = {
  data: {
    id: 4,
    name: 'Charmander',
    height: 6,
    weight: 48,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    abilities: ['blaze', 'olar-power'],
    types: ['fire'],
    cry: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/4.ogg',
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
    types: [],
    cry: '',
  },
};

export const mockPokemonResponse = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
  count: 2,
};

export const mockPokemonDataResponse1 = {
  id: 1,
  name: 'Bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } },
  ],
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  cries: {
    latest:
      'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
  },
};

export const mockPokemonDataResponse4 = {
  id: 4,
  name: 'Charmander',
  height: 6,
  weight: 85,
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      },
    },
  },
  abilities: [
    { ability: { name: 'blaze' } },
    { ability: { name: 'solar-power' } },
  ],
  types: [{ type: { name: 'fire' } }],
  cries: {
    latest:
      'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/4.ogg',
  },
};

export const mockPokemonDataResponse8 = {
  id: 8,
  name: 'wartortle',
  height: 10,
  weight: 225,
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
      },
    },
  },
  abilities: [
    { ability: { name: 'torrent' } },
    { ability: { name: 'rain-dish' } },
  ],
  types: [{ type: { name: 'water' } }],
  cries: {
    latest:
      'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/8.ogg',
  },
};
