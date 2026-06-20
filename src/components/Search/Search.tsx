'use client';

import { SubmitEventHandler, useActionState } from 'react';
import {
  PokemonActionState,
  searchPokemons,
} from '../../actions/pokemonActions';

type SearchProps = {
  initialValue: string;
};

const initialState: PokemonActionState = {
  pokemons: [],
  pokemonsTotal: 0,
};

const Search = ({ initialValue }: SearchProps) => {
  const [, formAction, isPending] = useActionState(
    searchPokemons,
    initialState
  );

  const handleInputSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get('search')?.toString().trim() || '';

    if (searchValue.toLowerCase() === initialValue.toLowerCase()) {
      event.preventDefault();
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleInputSubmit}
      className="max-w-2xl min-w-sm mx-auto flex mt-4"
    >
      <input
        type="search"
        name="search"
        defaultValue={initialValue}
        placeholder="Enter a pokemon name..."
        className="flex-1 px-4 py-3 rounded-bl-lg font-mono rounded-tl-lg bg-white dark:bg-teal-950 border-2 border-transparent dark:border-teal-900 focus:border-yellow-400 focus:outline-none text-gray-800 dark:text-gray-300 placeholder-gray-400"
      ></input>
      <button
        type="submit"
        disabled={isPending}
        className="bg-yellow-500 text-white font-mono text-lg px-6 py-3 rounded-br-lg rounded-tr-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
      >
        {isPending ? '...' : 'Search'}
      </button>
    </form>
  );
};

export default Search;
