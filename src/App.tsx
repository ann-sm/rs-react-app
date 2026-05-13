import { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import type { Pokemon } from './types';
import { fetchPokemonList } from './services/api';
import Search from './components/Search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/Pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [savedQuery, setSavedQuery] = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchPokemonList(savedQuery, page);
        setPokemons(data.items);
        setTotalPages(Math.ceil(data.itemsTotal / 25));
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [savedQuery, page]);

  function handleSearch(searchQuery: string) {
    const trimmedSearch = searchQuery.trim();
    const previousSearch = savedQuery;

    if (trimmedSearch !== previousSearch) {
      setSavedQuery(trimmedSearch);
      navigate('/?page=1');
    }
  }

  function handlePageChange(page: number) {
    navigate(`/?page=${page}`);
  }

  if (hasError) {
    throw new Error('Ask Pikachu what we should do...');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Search initialValue={savedQuery} onSearch={handleSearch} />
      <main className="flex flex-col flex-1 items-center justify-center mx-auto px-4 py-8">
        <CardList pokemons={pokemons} isLoading={isLoading} />
        {!isLoading && pokemons.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPrevPage={() => handlePageChange(page - 1)}
            onNextPage={() => handlePageChange(page + 1)}
          />
        )}
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
