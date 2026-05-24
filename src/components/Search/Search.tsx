import { useState } from 'react';
import type { SearchProps } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';

function Search({ initialValue, onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [savedValue] = useLocalStorage();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleInputSubmit() {
    const trimmedSearch = searchValue.trim();

    if (trimmedSearch !== searchValue) {
      setSearchValue(trimmedSearch);
    }
    if (trimmedSearch !== savedValue) {
      onSearch(trimmedSearch);
    }
  }

  return (
    <form
      onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleInputSubmit();
      }}
      className="max-w-2xl min-w-sm mx-auto flex mt-4"
    >
      <input
        type="search"
        name="search"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Enter a pokemon name..."
        className="flex-1 px-4 py-3 rounded-bl-lg font-mono rounded-tl-lg bg-white dark:bg-teal-950 border-2 border-transparent dark:border-teal-900 focus:border-yellow-400 focus:outline-none text-gray-800 dark:text-gray-300 placeholder-gray-400"
      ></input>
      <button
        type="submit"
        className="bg-yellow-500 text-white font-mono text-lg px-6 py-3 rounded-br-lg rounded-tr-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
