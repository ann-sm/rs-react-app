export interface PokemonResponse {
  name: string;
  url: string;
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string
  }
}

export interface Pokemon extends Omit<PokemonData, 'sprites'> {
  image: string;
}

export interface CardListProps {
  pokemons: Pokemon[];
}

export interface CardProps {
  data: Pokemon;
}

export interface AppState {
  pokemons: Pokemon[];
}