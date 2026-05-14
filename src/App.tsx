import { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import type { Pokemon } from './types';
import { fetchPokemonList } from './services/api';
import Search from './components/Search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/Pagination/Pagination';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [savedValue, setSavedValue] = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const navigate = useNavigate();

  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchPokemonList(savedValue, page);
        setPokemons(data.items);
        setTotalPages(Math.ceil(data.itemsTotal / 25));
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [savedValue, page]);

  function handleSearch(searchValue: string) {
    const trimmedSearch = searchValue.trim();

    if (trimmedSearch !== savedValue) {
      setSavedValue(trimmedSearch);
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
    <main className="flex flex-col min-h-screen bg-gray-100 text-center">
      <Search initialValue={savedValue} onSearch={handleSearch} />
      <section className="flex flex-1">
        <section
          className={
            detailsId
              ? 'flex flex-col w-3/4 h-full items-center'
              : 'flex flex-col w-full h-full items-center'
          }
        >
          <CardList pokemons={pokemons} isLoading={isLoading} />
        </section>
        {detailsId && (
          <section className="w-1/4 mr-8">
            <Outlet />
          </section>
        )}
      </section>
      {!isLoading && pokemons.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevPage={() => handlePageChange(page - 1)}
          onNextPage={() => handlePageChange(page + 1)}
        />
      )}
      <button
        className="bg-yellow-500 text-white font-mono m-auto w-fit text-lg px-6 py-3 my-12 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
        onClick={() => {
          setHasError(true);
        }}
      >
        Error Button
      </button>
    </main>
  );
}

export default App;
