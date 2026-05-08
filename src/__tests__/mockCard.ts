import type { CardProps } from "../types";

export const mockCard: CardProps = {
  data: {
    id: 1,
    name: 'Ivysaur',
    height: 10,
    weight: 100,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    abilities: ['overgrow', 'chlorophyll'],
  }
}

export const CardPropsMissing: CardProps = {
  data: {
    id: 1,
    name: '',
    height: 10,
    weight: 100,
    image: '',
    abilities: []
  }
}