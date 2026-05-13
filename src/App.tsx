import { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import type { Pokemon } from './types';
import { fetchPokemonList } from './services/api';
import Search from './components/Search/Search';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [savedQuery, setSavedQuery] = useState(
    localStorage.getItem('ann-sm-pokemons') || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchPokemonList(savedQuery, 1);
        setPokemons(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [savedQuery]);

  function handleSearch(searchQuery: string) {
    const trimmedSearch = searchQuery.trim();
    const previousSearch = savedQuery;

    if (trimmedSearch !== previousSearch) {
      localStorage.setItem('ann-sm-pokemons', trimmedSearch);
      setSavedQuery(trimmedSearch);
    }
  }

  if (hasError) {
    throw new Error('Ask Pikachu what we should do...');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Search initialValue={savedQuery} onSearch={handleSearch} />
      <main className="flex flex-col flex-1 items-center justify-center mx-auto px-4 py-8">
        <CardList pokemons={pokemons} isLoading={isLoading} />
        <button
          className="bg-yellow-500 text-white font-mono text-lg px-6 py-3 mt-12 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
          onClick={() => {
            setHasError(true);
          }}
        >
          Error Button
        </button>
      </main>
    </div>
  );
}

export default App;
