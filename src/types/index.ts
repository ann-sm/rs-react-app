import type { ReactNode } from 'react';

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
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface Pokemon extends Omit<PokemonData, 'sprites' | 'abilities'> {
  image: string;
  abilities: string[];
}

export interface AppState {
  pokemons: Pokemon[];
  savedQuery: string;
  isLoading: boolean;
  hasError: boolean;
}

export interface CardListProps {
  pokemons: CardProps[];
  isLoading: boolean;
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

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
