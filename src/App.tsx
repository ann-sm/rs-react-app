import { useEffect, useState } from 'react';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/Pagination/Pagination';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import Flyout from './components/Flyout/Flyout';
import { useAppSelector } from './store/hooks';
import { ITEMS_ON_PAGE, useGetPokemonListQuery } from './services/pokemonApi';
import ErrorComponent from './components/ErrorComponent/ErrorComponent';

function App() {
  const [savedValue, setSavedValue] = useLocalStorage();
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const detailsId = searchParams.get('details');
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, refetch } =
    useGetPokemonListQuery({
      searchValue: savedValue,
      page,
    });

  const pokemons = data?.items ?? [];
  const totalPages = Math.ceil((data?.itemsTotal ?? 0) / ITEMS_ON_PAGE);

  const selectedPokemons = useAppSelector(
    (state) => state.selectedPokemons.selectedPokemons
  );

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleSearch(searchValue: string) {
    if (searchValue !== savedValue) {
      setSavedValue(searchValue);
      navigate('/?page=1');
    }
  }

  function handlePageChange(page: number) {
    navigate(`/?page=${page}`);
  }

  if (error) {
    return (
      <main className="flex items-center justify-center h-screen p-4 bg-gray-100 dark:bg-teal-950">
        <ErrorComponent error={error} onRetry={() => refetch()} />
      </main>
    );
  }

  if (hasError) {
    throw new Error('Ask Pikachu what we should do...');
  }

  return (
    <main className="flex flex-col flex-1 bg-gray-100 dark:bg-teal-950 text-center">
      <Search
        initialValue={savedValue}
        savedValue={savedValue}
        onSearch={handleSearch}
      />
      <section className="flex flex-1">
        <section
          className={
            detailsId
              ? 'flex flex-col w-3/4 h-full items-center'
              : 'flex flex-col w-full h-full px-24 items-center'
          }
        >
          <CardList
            pokemons={pokemons}
            isLoading={isLoading}
            isFetching={isFetching}
          />
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
      {selectedPokemons.length > 0 && <Flyout />}
    </main>
  );
}

export default App;
