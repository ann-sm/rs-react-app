'use server';

import { revalidateTag } from 'next/cache';

const revalidatePokemonData = async (page: string, pokemonId?: string) => {
  revalidateTag(`pokemons-${page}`, 'max');
  
  if (pokemonId) {
    revalidateTag(`pokemon-${pokemonId}`, 'max');
  }  
}

export default revalidatePokemonData;