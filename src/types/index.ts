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
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  cries: {
    latest: string;
  };
}

export interface Pokemon extends Omit<
  PokemonData,
  'sprites' | 'abilities' | 'types' | 'cries'
> {
  image: string;
  abilities: string[];
  types: string[];
  cry: string;
}

export interface AppState {
  pokemons: Pokemon[];
  savedValue: string;
  isLoading: boolean;
  hasError: boolean;
}

export interface CardListProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

export interface CardProps {
  data: Pokemon;
}

export interface SearchProps {
  initialValue: string;
  onSearch: (searchValue: string) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: (currentPage: number) => void;
  onNextPage: (currentPage: number) => void;
}
