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
    front_default: string;
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
}

export interface Pokemon extends Omit<PokemonData, 'sprites' | 'abilities'> {
  image: string;
  abilities: string[];
}

export interface AppState {
  pokemons: Pokemon[];
  savedQuery: string;
}

export interface CardListProps {
  pokemons: Pokemon[];
}

export interface CardProps {
  data: Pokemon;
}

export interface SearchProps {
  initialValue: string;
  onSearch: (searchQuery: string) => void;
}

export interface SearchState {
  searchQuery: string;
}
