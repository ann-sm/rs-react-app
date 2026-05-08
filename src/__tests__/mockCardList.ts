import type { CardListProps } from "../types";

export const mockCardList: CardListProps = {
  pokemons: [
    {
      id: 1,
      name: 'Ivysaur',
      height: 10,
      weight: 100,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
      abilities: ['overgrow', 'chlorophyll'],
    }, {
        id: 2,
        name: 'Bulbasaur',
        height: 8,
        weight: 60,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        abilities: ['overgrow'],
      }
    ],
  isLoading: false,
}

export const mockCardListPropsMissing: CardListProps = {
  pokemons: [
    {
      id: 1,
      name: '',
      height: 10,
      weight: 100,
      image: '',
      abilities: [],
    }, {
        id: 2,
        name: '',
        height: 8,
        weight: 60,
        image: '',
        abilities: [],
      }
    ],
  isLoading: false,
}