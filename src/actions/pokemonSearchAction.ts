'use server';

import type { Pokemon } from '../common/types';
import { redirect } from 'next/navigation';

export type PokemonActionState = {
  pokemons: Pokemon[];
  pokemonsTotal: number;
};

export const searchPokemons = async (
  _prevState: PokemonActionState,
  formData: FormData,
  locale: string
) => {
  const searchValue = formData.get('search')?.toString().trim() || '';
  if (searchValue) {
    redirect(`/${locale}?search=${encodeURIComponent(searchValue)}&page=1`);
  } else {
    redirect(`/${locale}?page=1`);
  }
};
